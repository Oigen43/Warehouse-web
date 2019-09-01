import axios from 'axios';

async function fetchData() {
  const req = await axios.get('http://localhost:3000/companies');
  return req.data;
}

export default { fetchData };
