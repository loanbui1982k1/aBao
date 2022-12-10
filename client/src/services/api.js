import axios from 'axios';
import { API_URL } from './constants';

export const getCategory = async () => {
  return await axios.get(`${API_URL}/category`);
};

export const getNews = async (title) => {
  return await axios.get(`${API_URL}/newspaper/${title}`);
};
