"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
} from "@mui/material";
import { useAddNewEventMutation } from "@/services/dashboard-service";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const formSchema = z.object({
  city: z.string().min(1, "City is required"),
  creatingAs: z.string().min(1, 'Creating as is required'),
  eventName: z.string().min(1, "Event name is required"),
  eventTitle: z.string().min(1, "Event title is required"),
  description: z.string().min(1, "Short description is required"),
  category: z.array(
    z.string().min(1, 'Category is required')
  ),
  subCategory: z.array(
    z.string().min(1, 'Sub Category is required')
  ),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  eventType: z.string().min(1, "Event type is required"),
  location: z.string().min(1, "Event location is required"),
  locationLink: z.string().url("Please enter a valid URL"),
  eventVideoLink: z.string().url("Please enter a valid YouTube URL"),
  meetingLink: z.string().url("Please enter a valid URL"),
  country: z.string().min(1, "Country is required"),
  district: z.string().min(1, "District is required"),
  // registrationAvailable: z.boolean(),
  registrationLink: z.string().url("Please enter a valid URL"),
  // contactPerson: z.array(
  //   z.object({
  //     name: z.string().min(1, "Contact person name is required"),
  //     position: z.string().min(1, "Position is required"),
  //     email: z.string().email("Please enter a valid email"),
  //     contactNumber: z.string().min(1, "Phone number is required"),
  //     waNumber: z.string().min(1, "WhatsApp number is required"),
  //     company: z.string().min(1, "Company is required"),
  //     whatsappAvailable: z.boolean(),
  //     language: z.string().min(1, "Language is required"),
  //     photo: z.string().min(1, "Photo is required"),
  //   })
  // ),
});

type FormValues = z.infer<typeof formSchema>;

// Mock data - replace with actual data from your API
const categories = {
  real_estate: [
    "property_showcase_launch",
    "investor_summit",
    "developer_meetup",
    "real_estate_expo_trade_show",
    "government_legal_update",
  ],
  luxury_asset: [
    "luxury_car_exhibition",
    "yacht_jet_showcase",
    "luxury_watch_collectible",
  ],
  educational_and_training: [
    "real_estate_sales_training",
    "investment_financial_workshop",
    "luxury_market_insight",
    "marketing_digital_growth_training",
  ],
  networking_and_business_growth: [
    "vip_networking_event",
    "b2b_collaboration_meetup",
    "industry_panel_discussion",
  ],
  webinars_online: [
    "live_real_estate_webinar",
    "luxury_market_insight_webinar",
    "developer_qa_session",
    "training_academy_webinar",
  ],
  social_and_exclusive: [
    "private_invitation_only_event",
    "exclusive_property_tour",
    "propadya_community_meetup",
  ],
};

const eventTypes = ["online", "offline"];
const countries = ["Bangladesh", "Canada", "United Kingdom"];
const districts = ["Dhaka", "New York", "Texas"];
const cities = ["Los Angeles", "San Francisco", "Bashundhara"];

export default function CreateView() {
  const [addNewEvent, { data, isError, isLoading }] = useAddNewEventMutation();

  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const [contactImage, setContactImage] = useState<File | null>(null);
  const [contactPreviewUrl, setContactPreviewUrl] = useState<string | null>(
    null
  );
  const [isContactDragging, setIsContactDragging] = useState(false);
  const [contactUploadError, setContactUploadError] = useState<string | null>(
    null
  );

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");

  const subCategories = selectedCategory
    ? categories[selectedCategory as keyof typeof categories]
    : [];

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setSelectedCategory(event.target.value);
    setSelectedSubCategory(""); // Reset sub-category when category changes
  };

  const handleSubCategoryChange = (event: SelectChangeEvent) => {
    setSelectedSubCategory(event.target.value);
  };

  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "success",
    data: [],
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    // setValue,
    // watch,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      city: "Bashundhara",
      country: "Bangladesh",
      creatingAs: "",
      eventName: "Bangladesh International Tools & Hardware Expo 2025",
      eventTitle: "Bangladesh International Tools & Hardware Expo 2025",
      description:
        "Bangladesh International Tools & Hardware Expo is the largest Platform for showcasing Hand Tools, Power Tools, Machine Tools, Industrial Tools, and all types of Fasteners in Bangladesh's fast-growing market. At the BITH EXPO, the global & local tools and fastener industry will display the latest and most innovative products like hand tools, power tools, machine tools, fasteners, cutting & welding Tools, Garden Equipment's, Doors & Windows Tools and accessories, building material tools, plumbing equipment's, DIY tools, electrical hardware tools, paints etc.",
      category: ['luxury_asset'],
      subCategory: ['luxury_car_exhibition'],
      startDate: "2025-06-19",
      endDate: "2025-06-21",
      startTime: "09:00",
      endTime: "18:00",
      eventType: "online",
      location:
        "International Convention City Bashundhara Purbachal Express Hwy",
      locationLink: "https://maps.app.goo.gl/f2wmwCWAHhuVZmMG6",
      eventVideoLink: "https://www.youtube.com/watch?v=zjLGnFA-V1c",
      meetingLink: "https://10times.com/e1dd-2zp2-h2z3-f",
      registrationLink: "https://10times.com/e1dd-2zp2-h2z3-f",
      // registrationAvailable: true,
      district: "Dhaka",
      // contactPerson: [
      //   {
      //     name: "Tahsin",
      //     position: "string",
      //     email: "tahsin@example.com",
      //     contactNumber: "01756080382",
      //     waNumber: "string",
      //     company: "string",
      //     whatsappAvailable: true,
      //     language: "string",
      //     photo: "string",
      //   },
      // ],
    },
  });


  // 1. First, define the type for your form values
  type FormValues = z.infer<typeof formSchema>;

  // 2. In your component, create a form submission handler
  const onSubmit = async (data: FormValues) => {
    try {
      // Format the data to match your API expectations
      const eventData = {
        city: data.city,
        country: data.country,
        title: data.eventTitle,
        description: data.description,
        category: data.category,
        sub_category: data.subCategory,
        start_date: data.startDate,
        end_date: data.endDate,
        start_time: data.startTime,
        end_time: data.endTime,
        event_type: data.eventType,
        location: data.location,
        location_link: data.locationLink,
        video_link: data.eventVideoLink,
        meeting_link: data.meetingLink,
        registration_link: data.registrationLink,
        // registration_available: true,
        district: data.district,
        contact_person: [{
          name: "Tahsin",
          position: "string",
          email: "tahsin@example.com",
          contact_number: "017xxxxxxxx",
          wa_number: "017xxxxxxxx",
          company: "string",
          whatsapp_available: true,
          language: "string",
          photo: "string",
        }],
      };

      const result = await addNewEvent(eventData);
      if (result?.error) {
        setAlert({
          open: true,
          severity: "error",
          message: result?.error?.data?.message,
          data: result?.error?.data?.data,
        });
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };



  const handleClick = () => {
    const fileInput = document.getElementById(
      "file-upload"
    ) as HTMLInputElement;
    fileInput?.click();
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    // Validate file type
    if (!file.type.startsWith("image/")) {
      setUploadError("Please upload an image file");
      return;
    }

    // Validate file size (max 3MB)
    if (file.size > 3 * 1024 * 1024) {
      setUploadError("File size should be less than 3MB");
      return;
    }

    // Validate minimum size (1MB)
    if (file.size < 1 * 1024 * 1024) {
      setUploadError("File size should be at least 1MB");
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

  const handleContactImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      processContactFile(file);
    }
  };

  const processContactFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setContactUploadError("Please upload an image file");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setContactUploadError("File size should be less than 10MB");
      return;
    }
    if (file.size < 3 * 1024 * 1024) {
      setContactUploadError("File size should be at least 3MB");
      return;
    }

    setContactImage(file);
    setContactUploadError(null);
    // setValue("contactPersonImage", file);

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
    const fileInput = document.getElementById(
      "contact-file-upload"
    ) as HTMLInputElement;
    fileInput?.click();
  };


  return (
    <Box sx={{ p: 3 }}>
      {alert.open ? (
        <Alert
          severity="error"
          onClose={() => {
            setAlert({ ...alert, open: false });
          }}
          sx={{ mb: 2 }}
        >
          <AlertTitle>{alert.severity}</AlertTitle>
          {alert.message}

          <List>
            {alert?.data?.map((item: string, index: number) => (
              <ListItem key={index}>
                <Typography variant="body2" sx={{ color: "danger.main" }}>
                  {item}
                </Typography>
              </ListItem>
            ))}
          </List>
        </Alert>
      ) : null}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography
            component={"span"}
            sx={{ fontSize: "14px", color: "#F5BE30" }}
          >
            You are creating event as
          </Typography>
          <Box component={"span"}>
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
                    width: "366px",
                    "& .MuiInputLabel-root": {
                      color: "primary.main",
                    },
                  }}
                />
              )}
            />
          </Box>
        </Box>

        <Typography
          variant="subtitle1"
          sx={{ color: "primary.main", fontSize: "24px", lineHeight: 1, mt: 3 }}
        >
          Event Cover Image
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Upload photos that describe your event visually
        </Typography>

        <Box
          onClick={handleClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          sx={{
            border: "2px dashed",
            borderColor: isDragging ? "primary.main" : "divider",
            borderRadius: 1,
            p: "40.5px",
            mt: 2,
            textAlign: "center",
            cursor: "pointer",
            backgroundColor: isDragging ? "action.hover" : "background.paper",
            transition: "all 0.2s ease-in-out",
            "&:hover": {
              borderColor: "primary.main",
              backgroundColor: "action.hover",
            },
          }}
        >
          {!previewUrl ? (
            <>
              <Typography sx={{ fontSize: "16px", fontWeight: "600" }}>
                Drag image or{" "}
                <Box component="span" sx={{ color: "primary.main" }}>
                  Browse
                </Box>
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                display="block"
                mt={1}
              >
                Max. file size: 3MB
              </Typography>
            </>
          ) : (
            <Typography color="primary" sx={{ mt: 1 }}>
              Click to change image
            </Typography>
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
          <Typography
            variant="subtitle1"
            sx={{ color: "primary.main", fontSize: "24px", lineHeight: 1, mt: 3 }}
          >
            Event Information
          </Typography>
          <Box
            sx={{
              width: "317px",
              height: "1px",
              backgroundColor: "primary.main",
              my: 1,
            }}
          />

          <Grid container spacing={3}>
            <Grid
              item
              xs={12}
              sm={3}
              sx={{ display: "flex", alignItems: "center" }}
            >
              Event Name *{" "}
            </Grid>
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

            <Grid
              item
              xs={12}
              sm={3}
              sx={{ display: "flex", alignItems: "center" }}
            >
              Event Title *{" "}
            </Grid>
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

            <Grid
              item
              xs={12}
              sm={3}
              sx={{ display: "flex", alignItems: "center" }}
            >
              Event Short Description *{" "}
            </Grid>
            <Grid item xs={12} sm={9}>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Type here"
                    fullWidth
                    error={!!errors.description}
                    helperText={errors.description?.message}
                  />
                )}
              />
            </Grid>

            <Grid
              item
              xs={12}
              sm={3}
              sx={{ display: "flex", alignItems: "center" }}
            >
              Category *{" "}
            </Grid>
            <Grid item xs={12} sm={9}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Select
                    labelId="category-label"
                    id="category-select"
                    value={selectedCategory}
                    label="Select Category"
                    onChange={handleCategoryChange}
                    fullWidth
                  >
                    {Object.keys(categories).map((category) => (
                      <MenuItem key={category} value={category}>
                        {category
                          .split("_")
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() + word.slice(1)
                          )
                          .join(" ")}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Select
                    labelId="subcategory-label"
                    id="subcategory-select"
                    value={selectedSubCategory}
                    label="Select Sub Category"
                    onChange={handleSubCategoryChange}
                    fullWidth
                  >
                    {subCategories.map((subCategory) => (
                      <MenuItem key={subCategory} value={subCategory}>
                        {subCategory
                          .split("_")
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() + word.slice(1)
                          )
                          .join(" ")}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
              </Grid>
            </Grid>

            <Grid
              item
              xs={12}
              sm={3}
              sx={{ display: "flex", alignItems: "center" }}
            >
              Event Date *{" "}
            </Grid>
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

            <Grid
              item
              xs={12}
              sm={3}
              sx={{ display: "flex", alignItems: "center" }}
            >
              Event Time *
            </Grid>
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

            <Grid
              item
              xs={12}
              sm={3}
              sx={{ display: "flex", alignItems: "center" }}
            >
              Event Type *
            </Grid>
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

            <Grid
              item
              xs={12}
              sm={3}
              sx={{ display: "flex", alignItems: "center" }}
            >
              Enter Event location *
            </Grid>
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

            <Grid
              item
              xs={12}
              sm={3}
              sx={{ display: "flex", alignItems: "center" }}
            >
              Event Location Link (YouTube) *
            </Grid>
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

            <Grid
              item
              xs={12}
              sm={3}
              sx={{ display: "flex", alignItems: "center" }}
            >
              Event Video Link *
            </Grid>
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

            <Grid
              item
              xs={12}
              sm={3}
              sx={{ display: "flex", alignItems: "center" }}
            >
              Event Meeting Link *
            </Grid>
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

            <Grid
              item
              xs={12}
              sm={3}
              sx={{ display: "flex", alignItems: "center" }}
            >
              Registration Link *
            </Grid>
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

            <Grid
              item
              xs={12}
              sm={3}
              sx={{ display: "flex", alignItems: "center" }}
            >
              Country *
            </Grid>
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

            <Grid
              item
              xs={12}
              sm={3}
              sx={{ display: "flex", alignItems: "center" }}
            >
              District *
            </Grid>
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

            <Grid
              item
              xs={12}
              sm={3}
              sx={{ display: "flex", alignItems: "center" }}
            >
              City *
            </Grid>
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
              <Box sx={{ mb: 4, display: "flex", justifyContent: "end" }}>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Registration available"
                />
              </Box>
              <Typography
                sx={{
                  fontSize: "24px",
                  fontWeight: "500",
                  color: "primary.main",
                }}
                gutterBottom
              >
                Add Event Registration Form’s Field
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{ textTransform: "none", width: "218px", height: "60px" }}
              >
                Add New field
              </Button>
              <Grid container spacing={3}>
                {/* <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center' }}>Registration Link *</Grid>
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
              </Grid> */}

                <Grid
                  item
                  xs={12}
                  sm={3}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  Country *
                </Grid>
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

                <Grid
                  item
                  xs={12}
                  sm={3}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  District *
                </Grid>
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

                <Grid
                  item
                  xs={12}
                  sm={3}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  City *
                </Grid>
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
          </Grid>
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

        </Box>
      </form>
    </Box>
  );
}

// "is_all_day": true,
// event_image
// registration_last_date
