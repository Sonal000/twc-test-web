import axios from "axios";

const API_URL = "http://localhost:5000/api/v1";

export const useContacts = () => {
  const create = async (email, phone, fullname, gender) => {
    try {
      const response = await axios.post(
        `${API_URL}/contacts/add`,
        {
          email,
          phone,
          fullname,
          gender,
        },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const update = async (email, phone, fullname, gender, id) => {
    try {
      const response = await axios.post(
        `${API_URL}/contacts/${id}`,
        {
          email,
          phone,
          fullname,
          gender,
        },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  const deleteContact = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/contacts/${id}`, {
        withCredentials: true,
      });
      return response;
    } catch (error) {
      throw error;
    }
  };
  const getAll = async () => {
    try {
      const response = await axios.get(`${API_URL}/contacts`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  return { create, update, getAll, deleteContact };
};
