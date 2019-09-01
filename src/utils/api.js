import axios from 'axios';

async function fetchData(page = 1, perPage = 5) {
  const req = await axios.get(`http://localhost:3000/companies?page=${page}&per_page=${perPage}`);
  return req.data;
}

export default { fetchData };
