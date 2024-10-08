import axios from "axios";

const API_URL = "http://localhost:5000/api/v1";

export const useAuthentication = () => {
  const login = async (email, password) => {
    try {
      const response = await axios.post(
        `${API_URL}/users/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const register = async (email, password, passwordConfirm) => {
    try {
      const response = await axios.post(`${API_URL}/users/register`, {
        email,
        password,
        passwordConfirm,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const logout = async (email, password) => {
    try {
      const response = await axios.get(`${API_URL}/users/logout`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  return { login, register, logout };
};
