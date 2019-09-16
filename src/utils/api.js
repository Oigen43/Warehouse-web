import axios from 'axios';
import * as url from '../constants/urls';
import messageCode from '../constants/messages';

export default {
  get: function(customURL, params) {
    return this.requestHelper(axios.get(`${url.BASE_URL}${customURL}`, params));
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
      return {
        data: res.data.data,
        toast: this.createPopup(res)
      };
    } catch (err) {
      return {
        data: err.response,
        toast: this.createPopup(err.response)
      };
    }
  },
  createPopup: function(data) {
    return {
      variant: (data.status < 300) ? 'success' : 'danger',
      message: data.data.data.statusCode ? messageCode[data.data.data.statusCode] : (data.status < 300) ? 'Get data' : 'Something goes wrong!',
      done: data.data.done
    };
  }
};
