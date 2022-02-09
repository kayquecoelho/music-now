import axios from 'axios';

const BASE_URL= "http://localhost:5000";

async function registerUser(body) {
  await axios.post(`${BASE_URL}/sign-up`, body);
}

function signIn(body) {
  const promise = axios.post(`${BASE_URL}/sign-in`, body);

  return promise;
}

const requests = {
  registerUser,
  signIn
};

export default requests;