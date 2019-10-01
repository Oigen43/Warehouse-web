import axios from 'axios';
import * as url from '../constants/urls';
import messageCode from '../constants/messages';
import store from '../store';

axios.interceptors.request.use(function(config) {
  const token = store.state.token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    const refreshToken = store.state.refreshToken;
    config.headers.Authorization = `Bearer ${refreshToken}`;
  }

  return config;
}, function(err) {
  return Promise.reject(err);
});

axios.interceptors.response.use((response) => {
  return response;
}, (error) => {
  const originalRequest = error.config;
  if (error.response.status === 401) {
    store.dispatch('changeToken', store.state.refreshToken).then(() => {
      return axios.post(`${url.BASE_URL}${url.REFRESH_TOKEN_URL}`, { userId: store.state.currentUserId })
        .then(res => {
          console.log(11111111111111111111111, res);
          store.dispatch('updateTokens', res.data.data)
            .then(() => axios(originalRequest))
            .catch(err => {
              console.log(err);
            })
        })
        .catch(err => {
          store.dispatch('logout').then(() => {
            console.log(err);
          });
        });
    });
  }
});

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
  delete: function (customURL, params) {
    return requestHelper(axios.delete(`${url.BASE_URL}${customURL}`, {
      params: params
    }));
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
    if (err.request && err.request.status === 401) {
      try {
        console.log('HELLO');
        const res = await handler;
        console.log('WORLD!');
        if (res.status < 300 && res.data.data.statusCode === undefined) {
          return { data: res.data.data };
        }
        return {
          data: res.data.data,
          toast: createToast(res)
        };
      } catch (err) {
        await store.dispatch('logout');
      }
    }

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
