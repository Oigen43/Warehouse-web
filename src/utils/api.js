import axios from 'axios';
import * as url from '../constants/urls';
import messageCode from '../constants/messages';

export default {
  get: function (customURL, params) {
    return requestHelper(axios.get(`${url.BASE_URL}${customURL}`, {
      params: params
    }));
  },
  post: function (customURL, req) {
    return requestHelper(axios.post(`${url.BASE_URL}${customURL}`, req));
  },
  put: function (customURL, req) {
    return requestHelper(axios.put(`${url.BASE_URL}${customURL}`, req));
  },
  delete: function (customURL, req) {
    return requestHelper(axios.delete(`${url.BASE_URL}${customURL}`, { data: req }));
  }
};

async function requestHelper(handler) {
  try {
    const res = await handler;
    if (res.status < 300 && res.data.data.statusCode === undefined) {
      return { data: res.data.data };
    }
    return {
      data: res.data.data,
      toast: createToast(res)
    };
  } catch (err) {
    return {
      error: err,
      toast: createToast(err)
    };
  }
}

function createToast(data) {
  return {
    variant: (data.status && data.status < 300) ? 'success' : 'danger',
    message: ((data.response) && (data.response.data.data.statusCode)) ? messageCode[data.response.data.data.statusCode]
        : ((data.data) && (data.data.data.statusCode)) ? messageCode[data.data.data.statusCode]
        : ((data.request) && (!data.response)) ? 'Server is not available!'
        : 'Something went wrong!',
    title: (data.status && data.status < 300) ? 'Success!' : 'Error!'
  };
}
