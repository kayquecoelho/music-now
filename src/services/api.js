import axios from 'axios';

const BASE_URL= process.env.REACT_APP_API_BASE_URL;

async function registerUser(body) {
  await axios.post(`${BASE_URL}/sign-up`, body);
}
const api = {
  registerUser
};

export default api;