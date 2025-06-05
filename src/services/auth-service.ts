// Authentication service connected to real API endpoint

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface ApiUser {
  id: number;
  name: string;
  email: string;
}

export interface ApiLoginResponse {
  user: ApiUser;
  token: string;
}

export interface UserData {
  id: string;
  email: string;
  name: string;
  token: string;
}

// API URLs
const API_BASE_URL = 'https://dummy-1.hiublue.com/api';
const LOGIN_URL = `${API_BASE_URL}/login`;

export const authService = {
  /**
   * Login function - calls the actual API endpoint
   */
  async login(credentials: LoginCredentials): Promise<UserData> {
    try {
      const response = await fetch(LOGIN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });
      console.log(JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }));
      console.log("response", response);
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Login failed');
      }

      const data: ApiLoginResponse = await response.json();

      console.log(data);
      
      // Convert API user format to our internal UserData format
      return {
        id: data.user.id.toString(),
        email: data.user.email,
        name: data.user.name,
        token: data.token,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Network error during login');
    }
  },
  
  /**
   * Logout function - in a real app, this might invalidate the token on the backend
   * For now, we just handle client-side logout
   */
  async logout(): Promise<void> {
    // For a complete implementation, you might want to call an API endpoint to invalidate the token
    return Promise.resolve();
  },

  /**
   * Check if the current token is valid
   * For now, we just assume the token is valid if it exists
   * In a production app, you would verify with a server endpoint
   */
  async validateToken(token: string): Promise<UserData> {
    // For this example, we'll assume the token is valid if it exists
    // In a real app, you would make an API call to validate the token
    
    // Try to get user data from localStorage
    const userData = localStorage.getItem('mta_user');
    if (userData) {
      try {
        const user = JSON.parse(userData);
        if (user.token === token) {
          return user;
        }
      } catch (e) {
        // JSON parse error, will throw below
      }
    }
    
    throw new Error('Invalid token');
  }
};
