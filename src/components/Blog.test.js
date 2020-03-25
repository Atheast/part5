import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {render, fireEvent} from '@testing-library/react';
import Blog from './Blog';

test('display only title and author', () => {
  const blog = {
    title: 'Test',
    author: 'Test',
    url: 'http://test.com',
    likes: 0
  };

  const component = render(
    <Blog blog={blog} />
  );

  const div = component.container.querySelector('.blog');
  expect(div).toBeDefined();

  const e = component.container.querySelector('.showB');
  expect(e).toBeNull();

  expect(div).toHaveTextContent( 'Test - Test');
});

test('display whole blog', () => {
  const blog = {
    title: 'Test',
    author: 'Test',
    url: 'http://test.com',
    likes: 0
  };

  const component = render(
    <Blog blog={blog} />
  );

  const div = component.container.querySelector('.blog');
  expect(div).toBeDefined();

  const button = component.container.querySelector('.showBlog');
  fireEvent.click(button);

  const e = component.container.querySelector('.showB');
  expect(e).toBeDefined();
  expect(e).toHaveTextContent(blog.url);
  expect(e).toHaveTextContent(blog.likes);
});

test('like blog twice', () => {
  const blog = {
    title: 'Test',
    author: 'Test',
    url: 'http://test.com',
    likes: 0
  };

  const mockHandler = jest.fn();

  const component = render(
    <Blog blog={blog} addLike={mockHandler}/>
  );

  const button = component.container.querySelector('.showBlog');
  fireEvent.click(button);

  const likeButton = component.container.querySelector('.l');
  fireEvent.click(likeButton);
  fireEvent.click(likeButton);

  expect(mockHandler.mock.calls.length).toBe(2);
});