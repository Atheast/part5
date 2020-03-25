import axios from 'axios';

const baseUrl = 'http://localhost:3003/api/blogs';

const renderBlogs = async() => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const addBlog = async(token,blog) => {
  const t = 'bearer '+token;
  const config = {
    headers: {
      Authorization: t
    }
  };
  const res = await axios.post(baseUrl,blog,config);
  return res.data;
};

const addLike = async(token,blog) => {
  const t = 'bearer '+token;
  const config = {
    headers: {
      Authorization: t
    }
  };
  const url = `${baseUrl}/${blog.id}`;

  const res = await axios.put(url,blog,config);
  return res.data;
};

const removeBlog = async(token,id) => {
  const t = 'bearer '+token;
  const config = {
    headers: {
      Authorization: t
    }
  };
  const url = `${baseUrl}/${id}`;
  console.log(url);

  const res = await axios.delete(url,config);

  return res.data;
};

export default {renderBlogs, addBlog, addLike, removeBlog};