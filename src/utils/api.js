import axios from 'axios';

export default {
  fetchData: async (page, perPage) => {
    const res = await axios.get(`http://localhost:3030/companies?page=${page}&perPage=${perPage}`);
    return res.data;
  },
  sendNewCompanyData: async (req) => {
    await axios.post('http://localhost:3030/companies', req);
  },

  fetchUsersData: async (page, perPage) => {
    const res = await axios.get(`http://localhost:3030/users?page=${page}&perPage=${perPage}`);
    return res.data;
  },
  sendNewUserData: async (req) => {
    const res = await axios.post('http://localhost:3030/users', req);
    return res.data;
  },
  sendUpdatedUserData: async (req) => {
    const res = await axios.put('http://localhost:3030/users', req);
    return res.data;
  },
  sendDeletedUserData: async (req) => {
    const res = await axios.delete('http://localhost:3030/users', { data: req });
    return res.data;
  }

};
