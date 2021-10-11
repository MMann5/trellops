import Axios from 'axios';

const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? window.location.origin + '/api/'
    : '//127.0.0.1:2556/api/';

var axios = Axios.create({
  withCredentials: true,
});

export const httpService = {
  get(endpoint) {
    return ajax(endpoint);
  },
  post(endpoint, data) {
    return ajax(endpoint, 'POST', data);
  },
  put(endpoint, data) {
    return ajax(endpoint, 'PUT', data);
  },
  delete(endpoint, data) {
    return ajax(endpoint, 'DELETE', data);
  },
};

async function ajax(endpoint, method = 'GET', data = null) {
  try {
    const res = await axios({
      url: `${BASE_URL}${endpoint}`,
      method,
      data: data ? data : '',
    });
    return res.data;
  } catch (err) {
    console.log(
      `Had Issues ${method}ing to the backend, endpoint: ${endpoint}, with data: ${data}`
    );
    console.log(data);
    console.dir(err);
    throw err;
  }
}
