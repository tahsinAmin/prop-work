import axios from 'axios';

const API_URL = 'https://dummy-1.hiublue.com/api';
const API_EVENT_URL = 'http://147.182.165.199:9000';

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

const data = {
  "next": null,
  "previous": null,
  "count": 1,
  "total_pages": 1,
  "current_page": 1,
  "results": [
    {
      "id": 1,
      "deletion_time": null,
      "created_at": "2025-06-01T05:37:22.419949Z",
      "updated_at": "2025-06-01T05:37:22.419983Z",
      "is_active": true,
      "title": "Ajmon Brokers Event",
      "description": "This is a sample event description.",
      "start_date": "2025-03-18",
      "end_date": "2025-03-18",
      "is_all_day": true,
      "start_time": "10:00:00",
      "end_time": "19:00:00",
      "event_image": null,
      "event_video": "https://example.com/video.mp4",
      "event_type": "online",
      "registration_available": true,
      "registration_last_date": "2025-03-19",
      "registration_link": "https://example.com/register",
      "category": [
        "real_estate"
      ],
      "sub_category": [
        "property_showcase_launch"
      ],
      "meeting_link": "https://example.com/meeting",
      "country": "Dubai",
      "district": null,
      "city": "Al Ain",
      "location": "UAE",
      "location_link": null,
      "text_color": "#000000",
      "bg_color": "#ffffff",
      "status": "approved",
      "admin_comment": null
    },
    {
      "id": 2,
      "deletion_time": null,
      "created_at": "2025-06-01T05:37:22.419949Z",
      "updated_at": "2025-06-01T05:37:22.419983Z",
      "is_active": true,
      "title": "Ajmon Brokers Event",
      "description": "This is a sample event description.",
      "start_date": "2025-03-18",
      "end_date": "2025-03-18",
      "is_all_day": true,
      "start_time": "10:00:00",
      "end_time": "19:00:00",
      "event_image": null,
      "event_video": "https://example.com/video.mp4",
      "event_type": "online",
      "registration_available": true,
      "registration_last_date": "2025-03-19",
      "registration_link": "https://example.com/register",
      "category": [
        "real_estate"
      ],
      "sub_category": [
        "property_showcase_launch"
      ],
      "meeting_link": "https://example.com/meeting",
      "country": "Dubai",
      "district": null,
      "city": "Al Ain",
      "location": "UAE",
      "location_link": null,
      "text_color": "#000000",
      "bg_color": "#ffffff",
      "status": "pending",
      "admin_comment": null
    },
    {
      "id": 3,
      "deletion_time": null,
      "created_at": "2025-06-01T05:37:22.419949Z",
      "updated_at": "2025-06-01T05:37:22.419983Z",
      "is_active": true,
      "title": "Ajmon Brokers Event",
      "description": "This is a sample event description.",
      "start_date": "2025-03-18",
      "end_date": "2025-03-18",
      "is_all_day": true,
      "start_time": "10:00:00",
      "end_time": "19:00:00",
      "event_image": null,
      "event_video": "https://example.com/video.mp4",
      "event_type": "online",
      "registration_available": true,
      "registration_last_date": "2025-03-19",
      "registration_link": "https://example.com/register",
      "category": [
        "real_estate"
      ],
      "sub_category": [
        "property_showcase_launch"
      ],
      "meeting_link": "https://example.com/meeting",
      "country": "Dubai",
      "district": null,
      "city": "Al Ain",
      "location": "UAE",
      "location_link": null,
      "text_color": "#000000",
      "bg_color": "#ffffff",
      "status": "rejected",
      "admin_comment": null
    },
    {
      "id": 2,
      "deletion_time": null,
      "created_at": "2025-06-01T05:37:22.419949Z",
      "updated_at": "2025-06-01T05:37:22.419983Z",
      "is_active": true,
      "title": "Ajmon Brokers Event",
      "description": "This is a sample event description.",
      "start_date": "2025-03-18",
      "end_date": "2025-03-18",
      "is_all_day": true,
      "start_time": "10:00:00",
      "end_time": "19:00:00",
      "event_image": null,
      "event_video": "https://example.com/video.mp4",
      "event_type": "online",
      "registration_available": true,
      "registration_last_date": "2025-03-19",
      "registration_link": "https://example.com/register",
      "category": [
        "real_estate"
      ],
      "sub_category": [
        "property_showcase_launch"
      ],
      "meeting_link": "https://example.com/meeting",
      "country": "Dubai",
      "district": null,
      "city": "Al Ain",
      "location": "UAE",
      "location_link": null,
      "text_color": "#000000",
      "bg_color": "#ffffff",
      "status": "approved",
      "admin_comment": null
    },
    {
      "id": 2,
      "deletion_time": null,
      "created_at": "2025-06-01T05:37:22.419949Z",
      "updated_at": "2025-06-01T05:37:22.419983Z",
      "is_active": true,
      "title": "Ajmon Brokers Event",
      "description": "This is a sample event description.",
      "start_date": "2025-03-18",
      "end_date": "2025-03-18",
      "is_all_day": true,
      "start_time": "10:00:00",
      "end_time": "19:00:00",
      "event_image": null,
      "event_video": "https://example.com/video.mp4",
      "event_type": "online",
      "registration_available": true,
      "registration_last_date": "2025-03-19",
      "registration_link": "https://example.com/register",
      "category": [
        "real_estate"
      ],
      "sub_category": [
        "property_showcase_launch"
      ],
      "meeting_link": "https://example.com/meeting",
      "country": "Dubai",
      "district": null,
      "city": "Al Ain",
      "location": "UAE",
      "location_link": null,
      "text_color": "#000000",
      "bg_color": "#ffffff",
      "status": "approved",
      "admin_comment": null
    }
  ]
}

export interface EventList {
  id: number;
  deletion_time: string;
  created_at: string;
  updated_at: string;
  is_active: boolean;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  is_all_day: boolean;
  start_time: string;
  end_time: string;
  event_image: string;
  event_video: string;
  event_type: string;
  registration_available: boolean;
  registration_last_date: string;
  registration_link: string;
  category: string;
  sub_category: string;
  meeting_link: string;
  country: string;
  district: string;
  city: string;
  location: string;
  location_link: string;
  text_color: string;
  bg_color: string;
  status: string;
  admin_comment: string;
}

export async function getEvents() {  
  const url = `${API_EVENT_URL}/api/events/user/`;
  console.log("Attempting to fetch from URL:", url);
  
  try {
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      timeout: 10000,
    });
    
    console.log("Response received:", {
      status: response.status,
      data: response.data
    });
    
    return response.data;
  } catch (error) {
    console.log("Error fetching events:", error);
    console.log("Adding Dyummy data", data);

    // console.error('Error details:', {
    //   message: error.message,
    //   code: error.code,
    //   config: error.config?.url,
    //   response: error.response?.status
    // });
    return data;
    // throw error;
  }
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
