'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  MenuItem,
  styled,
  Checkbox,
  FormControlLabel,
  Alert,
  AlertTitle,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useAddNewEventMutation } from '@/services/dashboard-service';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

// Date format strings
const DATE_FORMAT = 'yyyy-MM-dd';
const TIME_FORMAT = 'HH:mm';

const formSchema = z.object({
  eventName: z.string().min(1, 'Event name is required'),
  eventTitle: z.string().min(1, 'Event title is required'),
  shortDescription: z.string().min(1, 'Short description is required'),
  category: z.string().min(1, 'Category is required'),
  subCategory: z.string().optional(),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  startTime: z.string().min(1, 'Start time is required'),
  endTime: z.string().min(1, 'End time is required'),
  eventType: z.string().min(1, 'Event type is required'),
  creatingAs: z.string().min(1, 'Creating as is required'),
  location: z.string().min(1, 'Event location is required'),
  locationLink: z.string().url('Please enter a valid URL'),
  eventVideoLink: z.string().url('Please enter a valid YouTube URL'),
  meetingLink: z.string().url('Please enter a valid URL'),
  registrationLink: z.string().url('Please enter a valid URL'),
  country: z.string().min(1, 'Country is required'),
  district: z.string().min(1, 'District is required'),
  city: z.string().min(1, 'City is required'),
  eventDescription: z.string().min(1, 'Event description is required'),
  eventRules: z.string().min(1, 'Event rules are required'),
  eventPrizes: z.string().min(1, 'Event prizes information is required'),
  eventTerms: z.string().min(1, 'Terms & conditions are required'),
  contactPersonName: z.string().min(1, 'Contact person name is required'),
  contactPersonEmail: z.string().email('Please enter a valid email'),
  contactPersonPhone: z.string().min(1, 'Phone number is required'),
  contactPersonImage: z.instanceof(File).nullable().refine(
    file => !file || file.size <= 10 * 1024 * 1024,
    'File size should be less than 10MB'
  ).refine(
    file => !file || file.size >= 3 * 1024 * 1024,
    'File size should be at least 3MB'
  ),
}).refine(data => {
  // Validate that end date is after start date
  if (data.startDate && data.endDate) {
    return new Date(data.endDate) >= new Date(data.startDate);
  }
  return true;
}, {
  message: 'End date must be after start date',
  path: ['endDate']
});

type FormValues = z.infer<typeof formSchema>;

// Mock data - replace with actual data from your API
const categories = ['Action', 'Adventure', 'Strategy', 'Puzzle'];
const eventTypes = ['Online', 'Offline', 'Hybrid'];
const countries = ['United States', 'Canada', 'United Kingdom'];
const districts = ['California', 'New York', 'Texas'];
const cities = ['Los Angeles', 'San Francisco', 'San Diego'];

export default function CreateView() {
  const [addNewEvent, { data, isError, isLoading }] = useAddNewEventMutation();
   
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const [contactImage, setContactImage] = useState<File | null>(null);
  const [contactPreviewUrl, setContactPreviewUrl] = useState<string | null>(null);
  const [isContactDragging, setIsContactDragging] = useState(false);
  const [contactUploadError, setContactUploadError] = useState<string | null>(null);

  const [alert, setAlert] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      eventName: '',
      eventTitle: '',
      shortDescription: '',
      category: '',
      subCategory: '',
      startDate: format(new Date(), DATE_FORMAT),
      endDate: format(new Date(), DATE_FORMAT),
      startTime: format(new Date(), TIME_FORMAT),
      endTime: format(new Date(new Date().setHours(new Date().getHours() + 1)), TIME_FORMAT),
      eventType: '',
      creatingAs: '',
      location: '',
      locationLink: '',
      eventVideoLink: '',
      meetingLink: '',
      registrationLink: 'www.example-link.easy',
      country: '',
      district: '',
      city: '',
      eventDescription: '',
      eventRules: '',
      eventPrizes: '',
      eventTerms: '',
      contactPersonName: '',
      contactPersonEmail: '',
      contactPersonPhone: '',
      contactPersonImage: null,
    },
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      setUploadError('Please upload an image file');
      return;
    }

    // Validate file size (max 3MB)
    if (file.size > 3 * 1024 * 1024) {
      setUploadError('File size should be less than 3MB');
      return;
    }

    // Validate minimum size (1MB)
    if (file.size < 1 * 1024 * 1024) {
      setUploadError('File size should be at least 1MB');
      return;
    }

    setCoverImage(file);
    setUploadError(null);

    // Create preview URL
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleClick = () => {
    const fileInput = document.getElementById('file-upload') as HTMLInputElement;
    fileInput?.click();
  };

  const handleContactImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      processContactFile(file);
    }
  };

  const processContactFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setContactUploadError('Please upload an image file');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setContactUploadError('File size should be less than 10MB');
      return;
    }
    if (file.size < 3 * 1024 * 1024) {
      setContactUploadError('File size should be at least 3MB');
      return;
    }

    setContactImage(file);
    setContactUploadError(null);
    setValue('contactPersonImage', file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setContactPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleContactDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsContactDragging(true);
  };

  const handleContactDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsContactDragging(false);
  };

  const handleContactDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsContactDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      processContactFile(file);
    }
  };

  const handleContactClick = () => {
    const fileInput = document.getElementById('contact-file-upload') as HTMLInputElement;
    fileInput?.click();
  };

  // 1. First, define the type for your form values
  type FormValues = z.infer<typeof formSchema>;

  // 2. In your component, create a form submission handler
  const onSubmit = async (data: FormValues) => {
    try {
      // Format the data to match your API expectations
      const eventData = {
        name: data.eventName,
        title: data.eventTitle,
        description: data.shortDescription,
        category: data.category,
        subCategory: data.subCategory,
        startDate: data.startDate,
        endDate: data.endDate,
        startTime: data.startTime,
        endTime: data.endTime,
        type: data.eventType,
        location: data.location,
        locationLink: data.locationLink,
        videoLink: data.eventVideoLink,
        meetingLink: data.meetingLink,
        registrationLink: data.registrationLink,
        country: data.country,
        district: data.district,
        city: data.city,
        rules: data.eventRules,
        prizes: data.eventPrizes,
        terms: data.eventTerms,
        contact: {
          name: data.contactPersonName,
          email: data.contactPersonEmail,
          phone: data.contactPersonPhone,
          image: data.contactPersonImage,
        },
      };

      const result = await addNewEvent(eventData).unwrap();

      console.log('Event created successfully:', result);

    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  const handleAddNewEvent = async () => {
    try {
      let newData = {
        "contact_person": [
          {
            "name": "string",
            "position": "string",
            "email": "user@example.com",
            "contact_number": "string",
            "wa_number": "string",
            "company": "string",
            "whatsapp_available": true,
            "language": "string",
            "photo": "string"
          }
        ],
        "title": "string",
        "description": "string",
        "start_date": "2025-03-19",
        "end_date": "2025-03-19",
        "is_all_day": true,
        "start_time": "string",
        "end_time": "string",
        "event_image": "string",
        "event_video": "string",
        "event_type": "online",
        "registration_available": true,
        "registration_last_date": "2025-03-19",
        "registration_link": "string",
        "category": [
          "real_estate"
        ],
        "sub_category": [
          "property_showcase_launch"
        ],
        "meeting_link": "string",
        "country": "string",
        "district": "string",
        "city": "string",
        "location": "string",
        "location_link": "string",
        "text_color": "string",
        "bg_color": "string"
      }
      const result = await addNewEvent(newData);
      console.log('Event created successfully:', result);
      if (result?.data) {
       console.log('Data!');
      }
      if (result?.error) {
        console.log(result?.error)
        setAlert({
          open: true,
          severity: 'error',
          message: result?.error?.data?.message,
        })
      }
    } catch (error) {
      console.error('Error creating event:', error);
    }
  }
 
  return (
    <Box sx={{ p: 3 }}>

      {alert.open ? <Alert severity='error' onClose={() => {setAlert({ ...alert, open: false })}}>
        <AlertTitle>{alert.severity}</AlertTitle>
        {alert.message}
      </Alert> : null}

      <Button
          variant="contained"
          color="primary"
          sx={{ textTransform: 'none', width: '218px', height: '60px' }}
          onClick={handleAddNewEvent}
        >
          Add New field
        </Button> 

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography component={'span'} sx={{ fontSize: '14px', color: '#F5BE30' }}>
          You are creating event as
        </Typography>
        <Box component={'span'}>
          <Controller
            name="creatingAs"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Type here"
                error={!!errors.creatingAs}
                helperText={errors.creatingAs?.message}
                sx={{
                  width: '366px',
                  '& .MuiInputLabel-root': {
                    color: 'primary.main'
                  }
                }}
              />
            )}
          />
        </Box>
      </Box>

      <Typography variant="subtitle1" sx={{ color: 'primary.main', fontSize: '24px', lineHeight: 1, mt: 3 }}>Event Cover Image</Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Upload photos that describe your event visually
      </Typography>

      <Box
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        sx={{
          border: '2px dashed',
          borderColor: isDragging ? 'primary.main' : 'divider',
          borderRadius: 1,
          p: '40.5px',
          mt: 2,
          textAlign: 'center',
          cursor: 'pointer',
          backgroundColor: isDragging ? 'action.hover' : 'background.paper',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            borderColor: 'primary.main',
            backgroundColor: 'action.hover',
          },
        }}
      >
        {!previewUrl ? (
          <>
            <Typography sx={{ fontSize: '16px', fontWeight: '600' }}>Drag image or <Box component="span" sx={{ color: 'primary.main' }}>Browse</Box></Typography>
            <Typography variant="caption" color="text.secondary" display="block" mt={1}>
              Max. file size: 3MB
            </Typography>
          </>
        ) : (
          <Typography color="primary" sx={{ mt: 1 }}>Click to change image</Typography>
        )}

        <VisuallyHiddenInput
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
        />
        {uploadError && (
          <Typography color="error" variant="caption" display="block" mt={1}>
            {uploadError}
          </Typography>
        )}
      </Box>

      <Box>
        <Typography variant="subtitle1" sx={{ color: 'primary.main', fontSize: '24px', lineHeight: 1, mt: 3 }}>Event Information</Typography>
        <Box sx={{ width: '317px', height: '1px', backgroundColor: 'primary.main', my: 1 }} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center' }}>Event Name * </Grid>
            <Grid item xs={12} sm={9}>
              <Controller
                name="eventName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Type here"
                    fullWidth
                    error={!!errors.eventName}
                    helperText={errors.eventName?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center' }}>Event Title * </Grid>
            <Grid item xs={12} sm={9}>
              <Controller
                name="eventTitle"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Type here"
                    fullWidth
                    error={!!errors.eventTitle}
                    helperText={errors.eventTitle?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center' }}>Event Short Description * </Grid>
            <Grid item xs={12} sm={9}>
              <Controller
                name="shortDescription"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Type here"
                    fullWidth
                    error={!!errors.shortDescription}
                    helperText={errors.shortDescription?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center' }}>Category * </Grid>
            <Grid item xs={12} sm={9}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="category"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        select
                        label="Category *"
                        fullWidth
                        error={!!errors.category}
                        helperText={errors.category?.message}
                      >
                        <MenuItem value="">Choose here</MenuItem>
                        {categories.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="subCategory"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        select
                        label="Sub category"
                        fullWidth
                        error={!!errors.subCategory}
                        helperText={errors.subCategory?.message}
                      >
                        <MenuItem value="">Choose here</MenuItem>
                        {categories.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center' }}>Event Date * </Grid>
            <Grid item xs={12} sm={9}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Controller
                    name="startDate"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        type="date"
                        fullWidth
                        InputLabelProps={{
                          shrink: true,
                        }}
                        error={!!errors.startDate}
                        helperText={errors.startDate?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Controller
                    name="endDate"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        type="date"
                        fullWidth
                        InputLabelProps={{
                          shrink: true,
                        }}
                        error={!!errors.endDate}
                        helperText={errors.endDate?.message}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center' }}>Event Time *</Grid>
            <Grid item xs={12} sm={9}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Controller
                    name="startTime"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        type="time"
                        fullWidth
                        InputLabelProps={{
                          shrink: true,
                        }}
                        error={!!errors.startTime}
                        helperText={errors.startTime?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Controller
                    name="endTime"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        type="time"
                        fullWidth
                        InputLabelProps={{
                          shrink: true,
                        }}
                        error={!!errors.endTime}
                        helperText={errors.endTime?.message}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center' }}>Event Type *</Grid>
            <Grid item xs={12} sm={9}>
              <Controller
                name="eventType"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label="Event Type *"
                    fullWidth
                    error={!!errors.eventType}
                    helperText={errors.eventType?.message}
                  >
                    <MenuItem value="">Choose here</MenuItem>
                    {eventTypes.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>

            <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center' }}>Enter Event location *</Grid>
            <Grid item xs={12} sm={9}>
              <Controller
                name="location"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Type here"
                    fullWidth
                    error={!!errors.location}
                    helperText={errors.location?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center' }}>Event Location Link (YouTube) *</Grid>
            <Grid item xs={12} sm={9}>
              <Controller
                name="locationLink"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Type here"
                    fullWidth
                    error={!!errors.locationLink}
                    helperText={errors.locationLink?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center' }}>Event Video Link *</Grid>
            <Grid item xs={12} sm={9}>
              <Controller
                name="eventVideoLink"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Type here"
                    fullWidth
                    error={!!errors.eventVideoLink}
                    helperText={errors.eventVideoLink?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center' }}>Event Meeting Link *</Grid>
            <Grid item xs={12} sm={9}>
              <Controller
                name="meetingLink"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Type here"
                    fullWidth
                    error={!!errors.meetingLink}
                    helperText={errors.meetingLink?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center' }}>Registration Link *</Grid>
            <Grid item xs={12} sm={9}>
              <Controller
                name="registrationLink"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Type here"
                    fullWidth
                    error={!!errors.registrationLink}
                    helperText={errors.registrationLink?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center' }}>Country *</Grid>
            <Grid item xs={12} sm={9}>
              <Controller
                name="country"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label="Type here"
                    fullWidth
                    error={!!errors.country}
                    helperText={errors.country?.message}
                  >
                    <MenuItem value="">Choose here</MenuItem>
                    {countries.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>

            <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center' }}>District *</Grid>
            <Grid item xs={12} sm={9}>
              <Controller
                name="district"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label="Type here"
                    fullWidth
                    error={!!errors.district}
                    helperText={errors.district?.message}
                  >
                    <MenuItem value="">Choose here</MenuItem>
                    {districts.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>

            <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center' }}>City *</Grid>
            <Grid item xs={12} sm={9}>
              <Controller
                name="city"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label="Type here"
                    fullWidth
                    error={!!errors.city}
                    helperText={errors.city?.message}
                  >
                    <MenuItem value="">Choose here</MenuItem>
                    {cities.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>

            {/* Event Details Section */}
            <Grid item xs={12} sx={{ mt: 3 }}>
              <Box sx={{ mb: 4, display: 'flex', justifyContent: 'end' }}><FormControlLabel control={<Checkbox defaultChecked />} label="Registration available" /></Box>
              <Typography sx={{ fontSize: '24px', fontWeight: '500', color: 'primary.main' }} gutterBottom>Add Event Registration Form’s Field</Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{ textTransform: 'none', width: '218px', height: '60px' }}
              >
                Add New field
              </Button> 
              <Grid container spacing={3}>
              <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center' }}>Registration Link *</Grid>
            <Grid item xs={12} sm={9}>
              <Controller
                name="registrationLink"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Type here"
                    fullWidth
                    error={!!errors.registrationLink}
                    helperText={errors.registrationLink?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center' }}>Country *</Grid>
            <Grid item xs={12} sm={9}>
              <Controller
                name="country"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label="Type here"
                    fullWidth
                    error={!!errors.country}
                    helperText={errors.country?.message}
                  >
                    <MenuItem value="">Choose here</MenuItem>
                    {countries.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>

            <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center' }}>District *</Grid>
            <Grid item xs={12} sm={9}>
              <Controller
                name="district"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label="Type here"
                    fullWidth
                    error={!!errors.district}
                    helperText={errors.district?.message}
                  >
                    <MenuItem value="">Choose here</MenuItem>
                    {districts.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>

            <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center' }}>City *</Grid>
            <Grid item xs={12} sm={9}>
              <Controller
                name="city"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label="Type here"
                    fullWidth
                    error={!!errors.city}
                    helperText={errors.city?.message}
                  >
                    <MenuItem value="">Choose here</MenuItem>
                    {cities.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>
              </Grid>
            </Grid>
            {/* Contact Person Details Section */}
            <Grid item xs={12} sx={{ mt: 3 }}>
              <Typography variant="h6" gutterBottom>Contact Person Details</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <Controller
                    name="contactPersonName"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Contact Person Name *"
                        fullWidth
                        error={!!errors.contactPersonName}
                        helperText={errors.contactPersonName?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Controller
                    name="contactPersonEmail"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        type="email"
                        label="Contact Person Email *"
                        fullWidth
                        error={!!errors.contactPersonEmail}
                        helperText={errors.contactPersonEmail?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Controller
                    name="contactPersonPhone"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        type="tel"
                        label="Contact Person Phone *"
                        fullWidth
                        error={!!errors.contactPersonPhone}
                        helperText={errors.contactPersonPhone?.message}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sx={{ mt: 3, mb: 2 }}>



              <Typography variant="h6" gutterBottom>Contact Person Image</Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Upload a clear photo of the contact person
              </Typography>
              <Box
                onClick={handleContactClick}
                onDragOver={handleContactDragOver}
                onDragLeave={handleContactDragLeave}
                onDrop={handleContactDrop}
                sx={{
                  border: '2px dashed',
                  borderColor: isContactDragging ? 'primary.main' : 'divider',
                  borderRadius: 1,
                  p: 4,
                  textAlign: 'center',
                  cursor: 'pointer',
                  backgroundColor: isContactDragging ? 'action.hover' : 'background.paper',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    borderColor: 'primary.main',
                    backgroundColor: 'action.hover',
                  },
                }}
              >
                {contactPreviewUrl ? (
                  <Box
                    component="img"
                    src={contactPreviewUrl}
                    alt="Contact Preview"
                    sx={{
                      maxWidth: '100%',
                      maxHeight: '200px',
                      mb: 2,
                      borderRadius: 1,
                    }}
                  />
                ) : (
                  <CloudUploadIcon sx={{ fontSize: 40, mb: 1, color: 'text.secondary' }} />
                )}

                {!contactPreviewUrl ? (
                  <>
                    <Typography>Drag image or <Box component="span" sx={{ color: 'primary.main' }}>Browse</Box></Typography>
                    <Typography variant="caption" color="text.secondary" display="block" mt={1}>
                      Max. file size: 10MB | Min. file size: 3MB
                    </Typography>
                  </>
                ) : (
                  <Typography color="primary" sx={{ mt: 1 }}>Click to change image</Typography>
                )}

                <VisuallyHiddenInput
                  id="contact-file-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleContactImageUpload}
                />
                {contactUploadError && (
                  <Typography color="error" variant="caption" display="block" mt={1}>
                    {contactUploadError}
                  </Typography>
                )}
                {errors.contactPersonImage && (
                  <Typography color="error" variant="caption" display="block" mt={1}>
                    {errors.contactPersonImage.message as string}
                  </Typography>
                )}
              </Box>
            </Grid>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <Button
                variant="outlined"
                color="primary"
                sx={{ backgroundColor: '#F4F8EE', textTransform: 'none', width: '218px', height: '60px' }}
              >
                Save draft and Exit
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                disabled={isSubmitting || isLoading}
              >
                {isSubmitting || isLoading ? 'Creating Event...' : 'Create Event'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
}