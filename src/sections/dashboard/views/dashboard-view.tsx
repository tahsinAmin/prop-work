'use client';

import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import axios from 'axios';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Button, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

// Import custom components
import OfferList from '@/components/dashboard/offer-list';

// Import dashboard service
import { DashboardStats } from '@/services/dashboard-service';
import { mockDashboardData } from '@/data/mock-dashboard-data';
import { primary } from '@/theme/palette';

// Dashboard filter options

const categories = {
  real_estate: [
    'property_showcase_launch',
    'investor_summit',
    'developer_meetup',
    'real_estate_expo_trade_show',
    'government_legal_update'
  ],
  luxury_asset: [
    'luxury_car_exhibition',
    'yacht_jet_showcase',
    'luxury_watch_collectible'
  ],
  educational_and_training: [
    'real_estate_sales_training',
    'investment_financial_workshop',
    'luxury_market_insight',
    'marketing_digital_growth_training'
  ],
  networking_and_business_growth: [
    'vip_networking_event',
    'b2b_collaboration_meetup',
    'industry_panel_discussion'
  ],
  webinars_online: [
    'live_real_estate_webinar',
    'luxury_market_insight_webinar',
    'developer_qa_session',
    'training_academy_webinar'
  ],
  social_and_exclusive: [
    'private_invitation_only_event',
    'exclusive_property_tour',
    'propadya_community_meetup'
  ]
};

const filter = 'this-week';

export default function DashboardView() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [dashboardData, setDashboardData] = useState<{ current: DashboardStats; previous: DashboardStats } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setSelectedCategory(event.target.value);
    setSelectedSubCategory(''); // Reset sub-category when category changes
  };

  const handleSubCategoryChange = (event: SelectChangeEvent) => {
    setSelectedSubCategory(event.target.value);
  };

  // Get sub-categories based on selected category
  const subCategories = selectedCategory ? categories[selectedCategory as keyof typeof categories] : [];

  // Fetch dashboard data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch data from the API endpoint shown in the screenshot
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/dashboard/summary`, {
          params: { filter },
          headers: {
            Authorization: 'Bearer fake-jwt-token'
          }
        });

        // Use the exact data structure from the screenshot
        const apiData = response.data;
        console.log("apiData = ", apiData);

        // Create dashboard data structure from API response
        const dashboardData = {
          current: {
            website_visits: {
              'Sunday': { desktop: 40, mobile: 30 },
              'Monday': { desktop: 60, mobile: 45 },
              'Tuesday': { desktop: 25, mobile: 40 },
              'Wednesday': { desktop: 45, mobile: 30 },
              'Thursday': { desktop: 50, mobile: 20 },
              'Friday': { desktop: 45, mobile: 10 },
              'Saturday': { desktop: 90, mobile: 55 }
            },
            offers_sent: {
              'Sunday': 10,
              'Monday': 15,
              'Tuesday': 25,
              'Wednesday': 65,
              'Thursday': 70,
              'Friday': 95,
              'Saturday': 55
            },
            total_stats: {
              active_users: Number(apiData.current.active_users),
              clicks: Number(apiData.current.clicks),
              appearances: Number(apiData.current.appearance),
              percentage: Number(apiData.previous.active_users) > 0
                ? parseFloat(((apiData.current.active_users - apiData.previous.active_users) / Number(apiData.previous.active_users) * 100).toFixed(1))
                : 0
            }
          },
          previous: {
            website_visits: {},
            offers_sent: {},
            total_stats: {
              active_users: Number(apiData.previous.active_users),
              clicks: Number(apiData.previous.clicks),
              appearances: Number(apiData.previous.appearance),
              percentage: apiData.previous.active_users > 0
                ? parseFloat(((apiData.current.active_users - apiData.previous.active_users) / Number(apiData.previous.active_users) * 100).toFixed(1))
                : 0
            }
          }
        };

        setDashboardData(dashboardData);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        // Use mock data instead of showing an error
        setDashboardData({
          current: mockDashboardData,
          previous: {
            ...mockDashboardData,
            total_stats: {
              ...mockDashboardData.total_stats,
              active_users: Math.round(mockDashboardData.total_stats?.active_users * 0.92),
              clicks: Math.round(mockDashboardData.total_stats?.clicks * 0.92),
              appearances: Math.round(mockDashboardData.total_stats?.appearances * 0.92),
            }
          }
        });
        // Show a warning instead of error
        setError('Using sample data. Could not connect to the API.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filter]);

  return (
    <>
      <Box
        sx={{
          position: 'relative',
          height: '276px',
          borderRadius: '16px',
          overflow: 'hidden',
          mb: 4,
          backgroundImage: 'url("/banner.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(255, 255, 255, 0)',
            backdropFilter: 'blur(2px)',
            WebkitBackdropFilter: 'blur(2px)',
          },
        }}
      >
        <Typography
          variant="h3"
          sx={{
            position: 'relative',
            zIndex: 1,
            color: '#fff',
            fontWeight: 'bold',
            textAlign: 'center',
            p: { xs: 2, md: 4 },
            width: { xs: '80%', md: '60%', lg: '40%', xl: '45%' }
          }}
        >
          Get your best deals with Gamenote Events!
        </Typography>
      </Box>


      <Box sx={{ mb: 2 }}>
        <Box sx={{ mb: 4 }}>
          <Typography component="span" sx={{ color: primary.main, fontWeight: 500, fontSize: '20px' }}>
            100,000+{' '}
          </Typography>
          <Typography component="span" sx={{ color: '#000000', fontWeight: 500, fontSize: '20px' }}>
            Games releasing this year!
          </Typography>
        </Box>

        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={7}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  placeholder="Search..."
                  value={"searchQuery"}
                  // onChange={(e) => setSearchQuery(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                    sx: {
                      borderRadius: '28px',
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '28px',
                      }
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel id="category-label">Select Category</InputLabel>
                  <Select
                    labelId="category-label"
                    id="category-select"
                    value={selectedCategory}
                    label="Select Category"
                    onChange={handleCategoryChange}
                    fullWidth
                    sx={{
                      borderRadius: '28px',
                      color: '#2065D1'
                    }}
                  >
                    {Object.keys(categories).map((category) => (
                      <MenuItem key={category} value={category}>
                        {category.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth disabled={!selectedCategory}>
                  <InputLabel id="subcategory-label">Select Sub Category</InputLabel>
                  <Select
                    labelId="subcategory-label"
                    id="subcategory-select"
                    value={selectedSubCategory}
                    label="Select Sub Category"
                    onChange={handleSubCategoryChange}
                    fullWidth
                    sx={{
                      borderRadius: '28px',
                      color: '#2065D1'
                    }}
                  >
                    {subCategories.map((subCategory) => (
                      <MenuItem key={subCategory} value={subCategory}>
                        {subCategory.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={5}>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>

              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{ textTransform: 'none', width: '218px', height: '60px' }}
                >
                  Event Calendar
                </Button>
                <Button
                  href="/create"
                  variant="contained"
                  color="primary"
                  sx={{ textTransform: 'none', width: '218px', height: '60px' }}
                >
                  Create Event
                </Button>
              </Box>

            </Box>
          </Grid>
        </Grid>


      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, alignItems: 'center', mb: 2 }}>
        <Button variant="outlined" color="primary" sx={{ textTransform: 'none', width: '130px', height: '48px', borderRadius: '33px' }}>
          Filter
        </Button>
        <Button
          variant="outlined"
          color="primary"
          sx={{ textTransform: 'none', width: '218px', height: '60px' }}
        >
          My Events
        </Button>
      </Box>


      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      {!loading && !error && dashboardData && (
        <>
          <OfferList />
        </>
      )}
    </>
  );
}