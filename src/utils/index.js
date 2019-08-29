import axios from 'axios';

export default {

  fetchData() {
    axios.get('localhost:3000/companies').then(
        response => {
            console.log(response);
        });
    }
};
