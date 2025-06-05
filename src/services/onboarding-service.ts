import axios from 'axios';

export type PlanType = 'monthly' | 'yearly' | 'pay as you go';
export type AdditionType = 'refundable' | 'on_demand' | 'negotiable';

export interface OnboardingOffer {
  plan_type: PlanType;
  additions: AdditionType[];
  user_id: number;
  expired: string; // ISO date string format
  price: number;
}

export const sendOnboardingOffer = async (offer: OnboardingOffer) => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/offers`, offer, {
      headers: {
        'Authorization': 'Bearer fake-jwt-token',
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error sending onboarding offer:', error);
    throw error;
  }
};

export const getOnboardingOffer = async (id: string) => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/offers/${id}`, {
      headers: {
        'Authorization': 'Bearer fake-jwt-token'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching onboarding offer:', error);
    throw error;
  }
};
