import axios from 'axios';

export default {
  fetchData: async (page, perPage) => {
    const req = await axios.get(`http://localhost:3030/companies?page=${page}&perPage=${perPage}`);
    return req.data;
  },
  sendNewCompanyData: async (res) => {
    await axios.post('http://localhost:3030/companies', res);
  }
};
