import axios from 'axios';

export default {
  fetchData: async (page, perPage) => {
    const res = await axios.get(`http://localhost:3030/companies?page=${page}&perPage=${perPage}`);
    return res.data;
  },
  sendNewCompanyData: async (req) => {
    await axios.post('http://localhost:3030/companies', req);
  },
  sendDeletedCompanyData: async (req) => {
    await axios.delete('http://localhost:3030/companies', req);
  }
};
