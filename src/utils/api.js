import axios from 'axios';

async function fetchData() {
  const req = await axios.get('http://localhost:30030/companies');
  return req.data;
}

export default { fetchData };
