import axios from 'axios';
import * as url from '../constants/urls';
import messageCode from '../constants/messages';

export default {
  get: function(customURL, params) {
    return this.requestHelper(axios.get(`${url.BASE_URL}${customURL}`, {
      params: params
    }));
  },
  post: function(customURL, req) {
    return this.requestHelper(axios.post(`${url.BASE_URL}${customURL}`, req));
  },
  put: function(customURL, req) {
    return this.requestHelper(axios.put(`${url.BASE_URL}${customURL}`, req));
  },
  delete: function(customURL, req) {
    return this.requestHelper(axios.delete(`${url.BASE_URL}${customURL}`, { data: req }));
  },
  requestHelper: async function(handler) {
    try {
      const res = await handler;
      if (res.status < 300 && res.data.data.statusCode === undefined) {
        return { data: res.data.data };
      }
      return {
        data: res.data.data,
        toast: this.createToast(res)
      };
    } catch (err) {
      return {
        data: err.response,
        toast: this.createToast(err.response)
      };
    }
  },
  createToast: function(data) {
    return {
      variant: (data.status < 300) ? 'success' : 'danger',
      message: data.data.data.statusCode ? messageCode[data.data.data.statusCode] : 'Something goes wrong!',
      done: data.data.done
    };
  }
};
