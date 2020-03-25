import React, {useState} from 'react';

const Blog = ({blog,removeBlog,addLike}) => {
  const [show, setShow] = useState(null);

  if(!show) {
    return(
      <div className="blog">
        <p>{blog.title} - {blog.author}</p>
        <button className="showBlog" onClick={() => setShow(true)}>View</button>
      </div>
    );
  } else {
    return(
      <div className="showB">
        <p><b>Title:</b> {blog.title}</p>
        <p><b>Author:</b> {blog.author}</p>
        <p><b>Url:</b> {blog.url}</p>
        <p className="like">
          <b>Likes:</b> {blog.likes}
          <button className="l" onClick={() => addLike(blog)}>Like</button>
        </p>
        <button id="remove" className="cancel" onClick={() => removeBlog(blog)}>Remove</button>
        <button className="cancel s" onClick={() => setShow(null)}>Close</button>
      </div>
    );
  }
};

export default Blog;