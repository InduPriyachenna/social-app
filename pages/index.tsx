"use client";

import { useState } from 'react';

const Home = () => {
  const [posts, setPosts] = useState([
    { id: 1, text: 'Hello, world!', likes: 0, comments: [] },
    { id: 2, text: 'This is a sample post', likes: 0, comments: [] },
  ]);
  const [newPost, setNewPost] = useState('');
  const [comment, setComment] = useState('');
  const [selectedPost, setSelectedPost] = useState<number | null>(null);

  const handlePost = () => {
    if (newPost.trim()) {
      setPosts([...posts, { id: posts.length + 1, text: newPost, likes: 0, comments: [] }]);
      setNewPost('');
    }
  };

  const handleLike = (id: number) => {
    setPosts(
      posts.map((post) =>
        post.id === id ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  const handleComment = (id: number) => {
    if (comment.trim()) {
      setPosts(
        posts.map((post) =>
          post.id === id ? { ...post, comments: [...post.comments, comment] } : post
        )
      );
      setComment('');
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 mt-4">
      <h1 className="text-3xl font-bold mb-4">Social App</h1>
      <div className="mb-4">
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          className="w-full p-2 border border-gray-400 rounded-lg"
          placeholder="Write a post"
        />
        <button
          onClick={handlePost}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mt-2"
        >
          Post
        </button>
      </div>
      <div className="feed">
        {posts.map((post) => (
          <div key={post.id} className="post mb-4 p-4 border border-gray-400 rounded-lg">
            <p className="text-lg">{post.text}</p>
            <div className="flex justify-between mt-2">
              <button
                onClick={() => handleLike(post.id)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
              >
                Like ({post.likes})
              </button>
              <button
                onClick={() => setSelectedPost(post.id)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
              >
                Comment
              </button>
            </div>
            {selectedPost === post.id && (
              <div className="comment-section mt-4">
                <input
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full p-2 border border-gray-400 rounded-lg"
                  placeholder="Write a comment"
                />
                <button
                  onClick={() => handleComment(post.id)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mt-2"
                >
                  Comment
                </button>
                <div className="comments mt-4">
                  {post.comments.map((commentText, index) => (
                    <p key={index} className="text-lg">{commentText}</p>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
