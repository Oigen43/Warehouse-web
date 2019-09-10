import axios from 'axios';

export default {
  fetchData: async (page, perPage) => {
    const res = await axios.get(`http://localhost:3030/companies?page=${page}&perPage=${perPage}`);
    return res.data;
  },
  sendNewCompanyData: async (req) => {
    const res = await axios.post('http://localhost:3030/companies', req);
    return res.data;
  },
  sendUpdatedCompanyData: async (req) => {
    const res = await axios.put('http://localhost:3030/companies', req);
    return res.data;
  },
  sendDeletedCompanyData: async (req) => {
    const res = await axios.delete('http://localhost:3030/companies', { data: req });
    return res.data;
  }
};
