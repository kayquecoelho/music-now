import axios from 'axios';

const BASE_URL= "http://localhost:5000";

async function registerUser(body) {
  await axios.post(`${BASE_URL}/sign-up`, body);
}
const requests = {
  registerUser
};

export default requests;