import axios from 'axios';
import { API_URL } from './constants';

export const getCategory = async () => {
  return await axios.get(`${API_URL}/category`);
};

export const getNews = async (title) => {
  return await axios.get(`${API_URL}/newspaper/${title}`);
};

export const postFavourite = async (params) => {
  return await axios.post(`${API_URL}/favourite/`, params);
};

export const deleteFavourite = async (params) => {
  return await axios.delete(`${API_URL}/favourite/`, { params: params });
};

export const getFavouriteTags = async (idUser) => {
  return await axios.get(`${API_URL}/favourite/category/${idUser}`);
};

export const getFavouriteNewsByTag = async (params) => {
  return await axios.get(`${API_URL}/favourite/newspaper`, {
    params: params,
  });
};

export const getFavouriteCheck = async (params) => {
  return await axios.get(`${API_URL}/favourite`, {
    params: params,
  });
};
