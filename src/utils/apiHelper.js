import axios from 'axios';
import * as url from '../constants/url';

export default {
  get: async (customURL, params) => {
    try {
      const res = await axios.get(`${url.BASE_URL}${customURL}`, params);
      return res.data;
    } catch (err) {
      return err.response.data;
    }
  },
  post: async (customURL, req) => {
    try {
      const res = await axios.post(`${url.BASE_URL}${customURL}`, req);
      return {
        data: res.data,
        status: res.status
      };
    } catch (err) {
      return {
        data: err.response.data,
        status: err.response.status
      };
    }
  },
  put: async (customURL, req) => {
    try {
      const res = await axios.put(`${url.BASE_URL}${customURL}`, req);
      return {
        data: res.data,
        status: res.status
      };
    } catch (err) {
      return {
        data: err.response.data,
        status: err.response.status
      };
    }
  },
  delete: async (customURL, req) => {
    try {
      const res = await axios.delete(`${url.BASE_URL}${customURL}`, { data: req });
      return {
        data: res.data,
        status: res.status
      };
    } catch (err) {
      return {
        data: err.response.data,
        status: err.response.status
      };
    }
  }
};
