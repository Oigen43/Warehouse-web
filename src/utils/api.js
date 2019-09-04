import axios from 'axios';

async function fetchCompaniesData() {
  const req = await axios.get('http://localhost:3030/companies');
  return req.data;
}

export default { fetchCompaniesData };
