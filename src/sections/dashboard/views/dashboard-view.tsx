'use client';

import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import axios from 'axios';

// Import custom components
import MetricCard from '@/components/dashboard/metric-card';
import BarChart from '@/components/dashboard/bar-chart';
import LineChart from '@/components/dashboard/line-chart';
import OfferList from '@/components/dashboard/offer-list';

// Import dashboard service
import { DashboardStats } from '@/services/dashboard-service';
import { mockDashboardData } from '@/data/mock-dashboard-data';

// Dashboard filter options

export default function DashboardView() {
  const [filter, setFilter] = useState('this-week');
  const [dashboardData, setDashboardData] = useState<{ current: DashboardStats; previous: DashboardStats } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
                ? parseFloat(((apiData.current.active_users - apiData.previous.active_users) /  Number(apiData.previous.active_users) * 100).toFixed(1))
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

  // Calculate percentage change between current and previous period
  const calculatePercentageChange = (current: number, previous: number) => {
    if (previous === 0) return 0;
    return parseFloat(((current - previous) / previous * 100).toFixed(1));
  };

  // Format numbers for display (e.g. 8.2k)
  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`;
    }
    return num.toString();
  };

  return (
    <>
      <Box 
        sx={{
          position: 'relative',
          height: '200px',
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
            background: 'rgba(255, 255, 255, 0.25)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
          },
        }}
      >
        <Typography 
          variant="h3" 
          sx={{
            position: 'relative',
            zIndex: 1,
            color: '#fff',
            textShadow: '0 2px 4px rgba(0,0,0,0.5)',
            fontWeight: 'bold',
            textAlign: 'center',
            p: {xs: 2, md: 4},
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            borderRadius: '12px',
            backdropFilter: 'blur(4px)',
            width: {xs: '80%', md: '60%', lg: '40%', xl: '30%'}
          }}
        >
          Get your best deals with Gamenote Events!
        </Typography>
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