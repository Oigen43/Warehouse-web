import axios from 'axios';

export default {
  login: async (req) => {
    const res = await axios.post(`http://localhost:3030/login`, req);
    return res.data;
  },
  fetchData: async (page, perPage) => {
    const res = await axios.get(`http://localhost:3030/companies?page=${page}&perPage=${perPage}`);
    return res.data;
  },
  sendNewCompanyData: async (req) => {
    try {
      const res = await axios.post('http://localhost:3030/companies', req);
      return res.data;
    } catch (err) {
      return err.response.data;
    }
  },
  sendUpdatedCompanyData: async (req) => {
    const res = await axios.put('http://localhost:3030/companies', req);
    return res.data;
  },
  sendDeletedCompanyData: async (req) => {
    const res = await axios.delete('http://localhost:3030/companies', { data: req });
    return res.data;
  },
  fetchWarehousesData: async (page, perPage, companyName) => {
    const res = await axios.get(`http://localhost:3030/warehouses?page=${page}&perPage=${perPage}&companyName=${companyName}`);
    return res.data;
  },
  sendNewWarehouseData: async (req) => {
    try {
      const res = await axios.post('http://localhost:3030/warehouses', req);
      return res.data;
    } catch (err) {
      return err.response.data;
    }
  },
  sendUpdatedWarehouseData: async (req) => {
    const res = await axios.put('http://localhost:3030/warehouses', req);
    return res.data;
  },
  sendDeletedWarehouseData: async (req) => {
    const res = await axios.delete('http://localhost:3030/warehouses', { data: req });
    return res.data;
  },

  fetchUsersData: async (page, perPage) => {
    const res = await axios.get(`http://localhost:3030/users?page=${page}&perPage=${perPage}`);
    return res.data;
  },
  sendNewUserData: async (req) => {
    try {
      const res = await axios.post('http://localhost:3030/users', req);
      return res.data;
    } catch (err) {
    return err.response.data;
  }
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
