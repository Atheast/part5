import React, {useState,useEffect} from 'react';
import blogsServices from '../services/blogs';
import PropTypes from 'prop-types';
import NewBlog from './NewBlog';
import Blog from './Blog';

const Blogs = ({user,setUser}) => {
  const [blogs, setBlogs] = useState([]);
  const [newMessage, setNew] = useState(null);

  useEffect(() => {
    blogsServices.renderBlogs()
      .then(res => {
        setBlogs(res.sort((a,b) => b.likes - a.likes));
      });
  },[]);

  const addLike = async(blog) => {
    const updated = {...blog, likes: blog.likes+1};
    const loggedUser = window.localStorage.getItem('loggedUser');
    const token = JSON.parse(loggedUser).token;
    const res = await blogsServices.addLike(token,updated);

    setBlogs(blogs.map(x => x.id === res.id ? res : x));
  };

  const removeBlog = async(blog) => {
    console.log(blog);
    const loggedUser = JSON.parse(window.localStorage.getItem('loggedUser'));

    if(loggedUser.username === blog.user.username) {
      if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
        await blogsServices.removeBlog(loggedUser.token,blog.id);

        setBlogs([...blogs].filter(x => x.id !== blog.id));
      }
    }


  };

  const logoutUser = () => {
    window.localStorage.removeItem('loggedUser');
    setUser(null);
  };

  return(
    <div className="blogs">
      <h2 style={{marginBottom: 5}}>Blogs</h2>
      <NewMessage newMessage={newMessage} />
      <hr />
      <p style={{marginTop: 10,marginBottom: 10}}><b>{user.name}</b> is logged in</p>
      <button className="logout" onClick={logoutUser}>Log Out</button>
      <hr />
      {blogs.map(x => <Blog key={x.id} blog={x} removeBlog={removeBlog} addLike={addLike}/>)}
      <hr />
      <NewBlog user={user} blogs={blogs} setBlogs={setBlogs} setNew={setNew}/>
    </div>
  );
};

const NewMessage = ({newMessage}) => {
  if(newMessage) {
    return (
      <h2 className="new">{newMessage}</h2>
    );
  } else {
    return '';
  }
};

Blogs.propTypes = {
  user: PropTypes.object.isRequired,
  setUser: PropTypes.func.isRequired
};


export default Blogs;