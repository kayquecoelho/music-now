import axios from 'axios';

const BASE_URL= "http://localhost:5000";

async function registerUser(body) {
  await axios.post(`${BASE_URL}/sign-up`, body);
}

async function signIn(body) {
  const auth = await axios.post(`${BASE_URL}/sign-in`, body);

  return auth; 
}

async function getProducts() {
  const products = await axios.get(`${BASE_URL}/products`);

  return products;
}

const requests = {
  registerUser,
  signIn,
  getProducts
};

export default requests;