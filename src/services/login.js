import axios from 'axios';

const baseUrl = 'http://localhost:3003/api/login';

const login = async(data) => {
  const res = await axios.post(baseUrl,data);
  return res.data;
};

const findUser = async(username) => {
  const res = await axios.get('http://localhost:3003/api/users/',username);
  console.log(res);
  return res.data;
};


export default {login, findUser};