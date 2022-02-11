import axios from 'axios';

const BASE_URL= "http://localhost:5000";

async function registerUser(body) {
  await axios.post(`${BASE_URL}/sign-up`, body);
}

async function signIn(body) {
  const auth = await axios.post(`${BASE_URL}/sign-in`, body);

  return auth; 
}

async function getProducts(type) {
  const products = await axios.get(`${BASE_URL}/products?${type && `type=${type}`}`);
  
  return products;
}

async function getArtists() {
  const artists = await axios.get(`${BASE_URL}/artists`);

  return artists; 
}

async function getArtistProducts(id) {
  const artistProducts = await axios.get(`${BASE_URL}/artist/${id}`);

  return artistProducts; 
}

const requests = {
  registerUser,
  signIn,
  getProducts,
  getArtists,
  getArtistProducts
};

export default requests;