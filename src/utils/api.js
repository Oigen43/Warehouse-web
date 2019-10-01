import axios from 'axios';
import * as url from '../constants/urls';
import messageCode from '../constants/messages';
import store from '../store';
import router from '../router';
import jwtDecode from 'jwt-decode';

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

function createAxiosResponseInterceptor () {
  const myInterceptor = axios.interceptors.response.use((response) => {
    return response;
  }, (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401) {
      store.dispatch('changeToken', store.state.refreshToken);
      axios.interceptors.response.eject(myInterceptor);
      const userData = jwtDecode(store.state.token);

      return axios.post(`${url.BASE_URL}${url.REFRESH_TOKEN_URL}`, {
        user: userData
      }).then(response => {
        store.dispatch('updateTokens', response.data.data);
        error.response.config.headers['Authorization'] = `Bearer ${response.data.data.token}`;
        return axios(originalRequest);
      }).catch(error => {
        store.dispatch('logout');
        router.push('/login');
        return Promise.reject(error);
      }).finally(createAxiosResponseInterceptor);
    } else {
      return Promise.reject(error);
    }
  });
}
createAxiosResponseInterceptor();

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
    return {
      error: err,
      toast: createToast(err)
    };
  }
}

function createToast(data) {
  return {
    variant: (data.status && data.status < 300) ? 'success' : 'danger',
    message: ((data.response) && (data.response.data.data) && (data.response.data.data.statusCode)) ? messageCode[data.response.data.data.statusCode]
        : ((data.response) && (data.response.data)) ? messageCode[data.response.data]
        : ((data.data) && (data.data.data.statusCode)) ? messageCode[data.data.data.statusCode]
        : ((data.request) && (!data.response)) ? 'Server is not available!'
        : 'Something went wrong!',
    title: (data.status && data.status < 300) ? 'Success!' : 'Error!'
  };
}
