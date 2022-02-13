import axios from 'axios';

const BASE_URL= "http://localhost:5000";

function createConfig(token) {
  return { headers: { Authorization: `Bearer ${token}` } };
}

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

async function getProduct(id) {
  const product = await axios.get(`${BASE_URL}/products/${id}`);

  return product;
}

async function getArtists() {
  const artists = await axios.get(`${BASE_URL}/artists`);

  return artists; 
}

async function getArtistProducts(id) {
  const artistProducts = await axios.get(`${BASE_URL}/artist/${id}`);

  return artistProducts; 
}

async function postCart(body, token) {
  const config = createConfig(token);

  await axios.post(`${BASE_URL}/cart`, body, config);
}

async function getCart(token) {
  const config = createConfig(token);

  const products = await axios.get(`${BASE_URL}/cart`, config);

  return products;
}

async function deleteProduct(token, id) {
  const config = createConfig(token);

  await axios.delete(`${BASE_URL}/cart/${id}`, config);
}

async function editQuantity(token, id, body) {
  const config = createConfig(token);

  await axios.put(`${BASE_URL}/cart/${id}`, body, config);
}

async function postCheckout(token, body) {
  const config = createConfig(token);

  await axios.post(`${BASE_URL}/checkout`, body, config);
}

const requests = {
  registerUser,
  signIn,
  getProducts,
  getProduct,
  getArtists,
  getArtistProducts,
  postCart,
  getCart,
  deleteProduct,
  editQuantity,
  postCheckout
};

export default requests;