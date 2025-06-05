import axios from 'axios';

const API_URL = 'https://dummy-1.hiublue.com/api';

export interface Offer {
  id: number;
  user_name: string;
  email: string;
  phone: string;
  company: string;
  jobTitle: string;
  status: 'accepted' | 'rejected' | 'pending';
  type: string;
  price?: number;
}

export interface OffersResponse {
  data: Offer[];
  meta?: {
    current_page: number;
    from: number;
    last_page: number;
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
  // Support for both API response formats
  total?: number;
  current_page?: number;
  per_page?: number;
  last_page?: number;
}

export interface OffersParams {
  page?: number;
  per_page?: number;
  search?: string;
  type?: string;
  status?: string;
}

export async function getOffers(params: OffersParams = {}): Promise<OffersResponse> {
  // Get token from localStorage since we don't have direct access to auth context here
  const userData = localStorage.getItem('mta_user');
  const token = userData ? JSON.parse(userData).token : null;
  
  if (!token) {
    throw new Error('Authentication required');
  }
  
  try {
    const response = await axios.get(`${API_URL}/offers`, {
      params,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching offers:', error);
    throw error;
  }
}
