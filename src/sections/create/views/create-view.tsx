'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format, parseISO } from 'date-fns';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Grid,
  FormControl,
  MenuItem,
  InputAdornment,
  IconButton,
  FormHelperText,
  styled
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

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
  gameName: z.string().min(1, 'Game name is required'),
  gameTitle: z.string().min(1, 'Game title is required'),
  shortDescription: z.string().min(1, 'Short description is required'),
  category: z.string().min(1, 'Category is required'),
  subCategory: z.string().optional(),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  startTime: z.string().min(1, 'Start time is required'),
  endTime: z.string().min(1, 'End time is required'),
  gameType: z.string().min(1, 'Game type is required'),
  gameLocation: z.string().min(1, 'Game location is required'),
  gameLocationLink: z.string().url('Please enter a valid URL'),
  gameVideoLink: z.string().url('Please enter a valid YouTube URL'),
  meetingLink: z.string().url('Please enter a valid URL'),
  registrationLink: z.string().url('Please enter a valid URL'),
  country: z.string().min(1, 'Country is required'),
  district: z.string().min(1, 'District is required'),
  city: z.string().min(1, 'City is required'),
  gameDescription: z.string().min(1, 'Game description is required'),
  gameRules: z.string().min(1, 'Game rules are required'),
  gamePrizes: z.string().min(1, 'Game prizes information is required'),
  gameTerms: z.string().min(1, 'Terms & conditions are required'),
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
const gameTypes = ['Online', 'Offline', 'Hybrid'];
const countries = ['United States', 'Canada', 'United Kingdom'];
const districts = ['California', 'New York', 'Texas'];
const cities = ['Los Angeles', 'San Francisco', 'San Diego'];

export default function CreateView() {
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const [contactImage, setContactImage] = useState<File | null>(null);
const [contactPreviewUrl, setContactPreviewUrl] = useState<string | null>(null);
const [isContactDragging, setIsContactDragging] = useState(false);
const [contactUploadError, setContactUploadError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      gameName: '',
      gameTitle: '',
      shortDescription: '',
      category: '',
      subCategory: '',
      startDate: format(new Date(), DATE_FORMAT),
      endDate: format(new Date(), DATE_FORMAT),
      startTime: format(new Date(), TIME_FORMAT),
      endTime: format(new Date(new Date().setHours(new Date().getHours() + 1)), TIME_FORMAT),
      gameType: '',
      gameLocation: '',
      gameLocationLink: '',
      gameVideoLink: '',
      meetingLink: '',
      registrationLink: 'www.example-link.easy',
      country: '',
      district: '',
      city: '',
      gameDescription: '',
      gameRules: '',
      gamePrizes: '',
      gameTerms: '',
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

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setUploadError('File size should be less than 10MB');
      return;
    }

    // Validate minimum size (3MB)
    if (file.size < 3 * 1024 * 1024) {
      setUploadError('File size should be at least 3MB');
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

  const onSubmit = (data: FormValues) => {
    console.log('Form data:', {
      ...data,
      // Combine date and time into datetime objects
      startDateTime: new Date(`${data.startDate}T${data.startTime}`).toISOString(),
      endDateTime: new Date(`${data.endDate}T${data.endTime}`).toISOString(),
    });
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Create Game
      </Typography>
      
      <Typography variant="subtitle1" gutterBottom>
        You are creating game as Game Developer
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>Game Cover Image</Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Upload photos that describe your game visually
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
            p: 4,
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
          {previewUrl ? (
            <Box
              component="img"
              src={previewUrl}
              alt="Preview"
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
          
          {!previewUrl ? (
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
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>Game Information</Typography>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Controller
                name="gameName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Game Name *"
                    fullWidth
                    error={!!errors.gameName}
                    helperText={errors.gameName?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="gameTitle"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Game Title *"
                    fullWidth
                    error={!!errors.gameTitle}
                    helperText={errors.gameTitle?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="shortDescription"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Game Short Description *"
                    fullWidth
                    multiline
                    rows={3}
                    error={!!errors.shortDescription}
                    helperText={errors.shortDescription?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
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

            <Grid item xs={12} md={6}>
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

            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" gutterBottom>Event Date *</Typography>
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
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <CalendarTodayIcon />
                            </InputAdornment>
                          ),
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
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <CalendarTodayIcon />
                            </InputAdornment>
                          ),
                        }}
                        error={!!errors.endDate}
                        helperText={errors.endDate?.message}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" gutterBottom>Game Time *</Typography>
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
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <AccessTimeIcon />
                            </InputAdornment>
                          ),
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
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <AccessTimeIcon />
                            </InputAdornment>
                          ),
                        }}
                        error={!!errors.endTime}
                        helperText={errors.endTime?.message}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="gameType"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label="Game Type *"
                    fullWidth
                    error={!!errors.gameType}
                    helperText={errors.gameType?.message}
                  >
                    <MenuItem value="">Choose here</MenuItem>
                    {gameTypes.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="gameLocation"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Enter Game location *"
                    fullWidth
                    error={!!errors.gameLocation}
                    helperText={errors.gameLocation?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="gameLocationLink"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Game location Link *"
                    fullWidth
                    error={!!errors.gameLocationLink}
                    helperText={errors.gameLocationLink?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="gameVideoLink"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Game Video link (YouTube) *"
                    fullWidth
                    error={!!errors.gameVideoLink}
                    helperText={errors.gameVideoLink?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="meetingLink"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Game Meeting Link *"
                    fullWidth
                    error={!!errors.meetingLink}
                    helperText={errors.meetingLink?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="registrationLink"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Registration Link *"
                    fullWidth
                    error={!!errors.registrationLink}
                    helperText={errors.registrationLink?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <Controller
                name="country"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label="Country *"
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

            <Grid item xs={12} md={4}>
              <Controller
                name="district"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label="District *"
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

            <Grid item xs={12} md={4}>
              <Controller
                name="city"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label="City *"
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
                          {/* Game Details Section */}
                          <Grid item xs={12} sx={{ mt: 3 }}>
                <Typography variant="h6" gutterBottom>Game Details</Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Controller
                      name="gameDescription"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Game Description *"
                          fullWidth
                          multiline
                          rows={4}
                          error={!!errors.gameDescription}
                          helperText={errors.gameDescription?.message}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Controller
                      name="gameRules"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Game Rules *"
                          fullWidth
                          multiline
                          rows={4}
                          error={!!errors.gameRules}
                          helperText={errors.gameRules?.message}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Controller
                      name="gamePrizes"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Game Prizes *"
                          fullWidth
                          multiline
                          rows={3}
                          error={!!errors.gamePrizes}
                          helperText={errors.gamePrizes?.message}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Controller
                      name="gameTerms"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Game Terms & Conditions *"
                          fullWidth
                          multiline
                          rows={3}
                          error={!!errors.gameTerms}
                          helperText={errors.gameTerms?.message}
                        />
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
                type="submit" 
                variant="contained" 
                color="primary" 
                size="large"
                fullWidth
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
}