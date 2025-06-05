import axios from 'axios';

export interface User {
  id: number;
  name: string;
  email: string;
}

export const searchUsers = async (searchQuery: string, page: number = 1, perPage: number = 5) => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users`, {
      params: {
        search: searchQuery,
        page,
        per_page: perPage
      },
      headers: {
        Authorization: 'Bearer fake-jwt-token'
      }
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error searching users:', error);
    throw error;
  }
};

export const getUserById = async (id: number) => {
  try {
    const response = await axios.get(`${ process.env.NEXT_PUBLIC_API_BASE_URL } / users / ${ id }`, {
      headers: {
        Authorization: 'Bearer fake-jwt-token'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};
