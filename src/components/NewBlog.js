import React, {useState} from 'react';
import blogServices from '../services/blogs';
import Toggable from './Toggable';

const NewBlog = ({user,blogs,setBlogs,setNew}) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const blogRef = React.createRef();

  const addBlog = async(e) => {
    e.preventDefault();
    const blog = {
      title,
      author,
      url
    };

    blogRef.current.toggleVisibility();
    const res = await blogServices.addBlog(user.token,blog);
    const newBlog = {...res, user: {username: user.username}};
    setTitle('');
    setUrl('');
    setAuthor('');
    setNew(`New blog added - ${blog.title} by ${blog.author}`);
    setTimeout(() => setNew(null),5000);
    setBlogs([...blogs,newBlog]);
  };

  return(
    <div className="newBlog">
      <Toggable buttonLabel="Add Blog" ref={blogRef}>
        <h2>Add Blog</h2>
        <form onSubmit={(e) => addBlog(e)}>
          <label>Title: </label>
          <input id="title" value={title} onChange={({target}) => setTitle(target.value)} />
          <label>Author: </label>
          <input id="author" value={author} onChange={({target}) => setAuthor(target.value)} />
          <label>Url: </label>
          <input id="url" value={url} onChange={({target}) => setUrl(target.value)} />
          <button id="add">Add blog</button>
        </form>
      </Toggable>
    </div>
  );
};

export default NewBlog;