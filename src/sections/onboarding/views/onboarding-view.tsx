'use client';

import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Grid,
  Alert,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
  Checkbox,
  CircularProgress,
  Autocomplete,
  InputAdornment
} from '@mui/material';
import { format } from 'date-fns';
import { debounce } from 'lodash';

import { OnboardingOffer, PlanType, AdditionType, sendOnboardingOffer } from '@/services/onboarding-service';
import { User, searchUsers } from '@/services/user-service';

// Form schema with Zod validation
const formSchema = z.object({
  user: z.object({
    id: z.number(),
    name: z.string(),
    email: z.string()
  }),
  plan_type: z.enum(['monthly', 'yearly', 'pay as you go']),
  additions: z.array(
    z.enum(['refundable', 'on_demand', 'negotiable'])
  ),
  expired: z.date(),
  price: z.number().positive('Price must be a positive number')
});

type FormValues = z.infer<typeof formSchema>;

export default function OnboardingView() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitSuccessMsg, setSubmitSuccessMsg] = useState('');
  const [submitError, setSubmitError] = useState('');

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      plan_type: 'monthly',
      additions: [],
      price: 0,
      expired: new Date()
    }
  });

  // Watch for changes to certain form fields
  const selectedUser = watch('user');

  // Debounced search function
  const debouncedSearch = debounce(async (query: string) => {
    
    if (!query || query.length < 2) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const response = await searchUsers(query);
      console.log("=> response", response);
      setSearchResults(response.data || []);
    } catch (error) {
      console.error('Error searching users:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  }, 300);

  // Trigger search when searchTerm changes
  useEffect(() => {
    debouncedSearch(searchTerm);
    return () => debouncedSearch.cancel();
  }, [searchTerm]);

  const onSubmit = async (data: FormValues) => {
    try {
      // Format the data to match API requirements
      const offerData: OnboardingOffer = {
        plan_type: data.plan_type,
        additions: data.additions,
        user_id: data.user.id,
        expired: format(data.expired, 'yyyy-MM-dd'),
        price: data.price
      };

      let result = await sendOnboardingOffer(offerData);
      setSubmitSuccess(true);
      setSubmitSuccessMsg(result.message);
      setSubmitError('');
      reset();

      // Hide success message after 3 seconds
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError('Failed to send offer. Please try again.');
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Create Offer
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
        Send onboarding offer to new user
      </Typography>

      <Paper sx={{ p: 4, mt: 3 }}>
        {submitSuccess && (
          <Alert severity="success" sx={{ mb: 3 }}>
            {submitSuccessMsg}
          </Alert>
        )}

        {submitError && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {submitError}
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            {/* Plan Type */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Plan Type
              </Typography>
              <Controller
                name="plan_type"
                control={control}
                render={({ field }) => (
                  <FormControl component="fieldset" error={!!errors.plan_type}>
                    <RadioGroup row {...field}>
                      <FormControlLabel value="pay as you go" control={<Radio />} label="Pay As You Go" />
                      <FormControlLabel value="monthly" control={<Radio />} label="Monthly" />
                      <FormControlLabel value="yearly" control={<Radio />} label="Yearly" />
                    </RadioGroup>
                    {errors.plan_type && <FormHelperText>{errors.plan_type.message}</FormHelperText>}
                  </FormControl>
                )}
              />
            </Grid>

            {/* Additions */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Additions
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                <Controller
                  name="additions"
                  control={control}
                  render={({ field }) => (
                    <FormControl component="fieldset" error={!!errors.additions}>
                      <Box>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={field.value.includes('refundable')}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setValue('additions', [...field.value, 'refundable']);
                                } else {
                                  setValue('additions', field.value.filter(item => item !== 'refundable'));
                                }
                              }}
                            />
                          }
                          label="Refundable"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={field.value.includes('on_demand')}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setValue('additions', [...field.value, 'on_demand']);
                                } else {
                                  setValue('additions', field.value.filter(item => item !== 'on_demand'));
                                }
                              }}
                            />
                          }
                          label="On demand"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={field.value.includes('negotiable')}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setValue('additions', [...field.value, 'negotiable']);
                                } else {
                                  setValue('additions', field.value.filter(item => item !== 'negotiable'));
                                }
                              }}
                            />
                          }
                          label="Negotiable"
                        />
                      </Box>
                      {errors.additions && <FormHelperText>{errors.additions.message}</FormHelperText>}
                    </FormControl>
                  )}
                />
              </Box>
            </Grid>

            {/* User */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                User
              </Typography>
              <Controller
                name="user"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.user}>
                    <Autocomplete
                      id="user-search"
                      options={searchResults}
                      getOptionLabel={(option) => `${option.name}`}
                      isOptionEqualToValue={(option, value) => option.id === value.id}
                      onChange={(_, newValue) => {
                        field.onChange(newValue);
                      }}
                      loading={isSearching}
                      value={field.value || null}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Search users"
                          variant="outlined"
                          onChange={(e) => setSearchTerm(e.target.value)}
                          error={!!errors.user}
                          helperText={errors.user?.message}
                          InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                              <>
                                {isSearching ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                              </>
                            ),
                          }}
                        />
                      )}
                    />
                    {errors.user && <FormHelperText>{errors.user.message}</FormHelperText>}
                  </FormControl>
                )}
              />
            </Grid>

            {/* Expired date */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Expired
              </Typography>
              <Controller
                name="expired"
                control={control}
                render={({ field: { onChange, value, ...field } }) => (
                  <TextField
                    {...field}
                    type="date"
                    fullWidth
                    value={value ? format(new Date(value), 'yyyy-MM-dd') : ''}
                    onChange={(e) => {
                      const date = e.target.value ? new Date(e.target.value) : null;
                      onChange(date);
                    }}
                    error={!!errors.expired}
                    helperText={errors.expired?.message}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                )}
              />
            </Grid>

            {/* Price */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Price
              </Typography>
              <Controller
                name="price"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="number"
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    fullWidth
                    error={!!errors.price}
                    helperText={errors.price?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending Offer...' : 'Send Offer'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
}