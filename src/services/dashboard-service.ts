import axios from 'axios';

const API_URL = 'https://dummy-1.hiublue.com/api';

// Dashboard data types
export interface DashboardStats {
  website_visits: {
    [day: string]: {
      desktop: number;
      mobile: number;
    };
  };
  offers_sent: {
    [day: string]: number;
  };
  total_stats?: {
    active_users: number;
    clicks: number;
    appearances: number;
    percentage: number;
  };
}

export async function getDashboardStats(filter: string = 'this-week'): Promise<DashboardStats> {
  // Get token from localStorage since we don't have direct access to auth context here
  const userData = localStorage.getItem('mta_user');
  const token = userData ? JSON.parse(userData).token : null;
  
  if (!token) {
    throw new Error('Authentication required');
  }
  
  try {
    const response = await axios.get(`${API_URL}/dashboard/stat`, {
      params: { filter },
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    throw error;
  }
}

export async function getComparisonStats(currentFilter: string = 'this-week', prevFilter: string = 'prev-week'): Promise<{
  current: DashboardStats;
  previous: DashboardStats;
}> {
  try {
    const [current, previous] = await Promise.all([
      getDashboardStats(currentFilter),
      getDashboardStats(prevFilter)
    ]);
    
    return { current, previous };
  } catch (error) {
    console.error('Error fetching comparison stats:', error);
    throw error;
  }
}
