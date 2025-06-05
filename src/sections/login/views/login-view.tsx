'use client';

import * as React from 'react';
import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import CircularProgress from '@mui/material/CircularProgress';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

// Define the login form validation schema with Zod
const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().optional(),
});

// Helper text for login credentials
const LOGIN_HELPER_TEXT = 'Use email: test@example.com, password: password123';

// Create a TypeScript type from the schema
type LoginFormData = z.infer<typeof loginSchema>;

export default function SignIn() {
  const router = useRouter();
  const { login, isAuthenticated, isLoading, error } = useAuth();
  const [showSnackbar, setShowSnackbar] = React.useState(false);
  
  // Initialize React Hook Form with Zod validation
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  // Form submission handler
  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data.email, data.password, data.rememberMe);
      // If successful, the user will be redirected by the useEffect above
    } catch (err) {
      // Error handling is done by the auth context
      setShowSnackbar(true);
    }
  };
  
  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
  };

  // Don't render the login form if user is already authenticated
  if (isAuthenticated) {
    return null;
  }
  
  return (
    <>
      <CssBaseline enableColorScheme />
      <SignInContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            Sign in
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {LOGIN_HELPER_TEXT}
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: 2,
            }}
          >
            <FormControl error={!!errors.email}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="email"
                    placeholder="your@email.com"
                    autoComplete="email"
                    autoFocus
                    required
                    fullWidth
                    variant="outlined"
                    size="small"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    sx={{ mt: 1 }}
                  />
                )}
              />
            </FormControl>
            <FormControl error={!!errors.password}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    placeholder="••••••"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    required
                    fullWidth
                    variant="outlined"
                    size="small"
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    sx={{ mt: 1 }}
                  />
                )}
              />
            </FormControl>
            <Controller
              name="rememberMe"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      {...field}
                      checked={field.value}
                      color="primary"
                    />
                  }
                  label="Remember me"
                />
              )}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isSubmitting || isLoading}
              startIcon={isSubmitting || isLoading ? <CircularProgress size={20} color="inherit" /> : null}
            >
              {isSubmitting || isLoading ? 'Signing in...' : 'Sign in'}
            </Button>
            <Link
              component="button"
              type="button"
              onClick={() => {
                // Add your forgot password logic here
              }}
              variant="body2"
              sx={{ alignSelf: 'center' }}
            >
              Forgot your password?
            </Link>
          </Box>
        </Card>
      </SignInContainer>
      
      {/* Error Snackbar */}
      <Snackbar 
        open={showSnackbar && !!error} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="error" variant="filled">
          {error || 'An error occurred during login'}
        </Alert>
      </Snackbar>
    </>
  );
}