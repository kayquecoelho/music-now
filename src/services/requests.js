import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

function signIn(body) {
  const promise = axios.post(`${BASE_URL}/sign-in`, body);

  return promise;
}

const requests = {
  signIn
}

export default requests;