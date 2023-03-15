import React from 'react';

import { PostList } from './components/PostList';
import { Comment } from './types/comment';
import { Post } from './types/post';
import { User } from './types/user';

import './App.scss';

import postsFromServer from './api/posts';
import commentsFromServer from './api/comments';
import usersFromServer from './api/users';

function getUserId(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}

const getCommentsId = (id: number): Comment[] => {
  return commentsFromServer.filter(comment => comment.postId === id);
};

export const posts: Post[] = postsFromServer.map(post => ({
  ...post,
  user: getUserId(post.userId),
  comments: getCommentsId(post.id),
}));

export const App: React.FC = () => (
  <section className="App">
    <h1 className="App__title">Static list of posts</h1>

    <PostList posts={posts} />
  </section>
);
