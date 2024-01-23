import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { TERipple } from 'tw-elements-react';
import { ConfirmDelete } from './confirmDelete';
import config from '../configs';
type Props = {}

type Post = {
  _id: string;
  user: {
    _id: string,
    username: string
  };
  title: string;
  content: string;
  comments: Comment[];
  time: string

};


export const GetPosts = (props: Props) => {
  const [posts, setPosts] = useState<Post[]>([])
  const [user, setUser] = useState(null)
  const pFormatted = {
    whitespace: "pre-line",
  }

  const apiUrl =
    process.env.NODE_ENV === "development"
      ? config.development.apiUrl
      : config.production.apiUrl;


  useEffect(() => {
    fetch(`${apiUrl}/posts`, {
      credentials: 'include',
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        setPosts(data.postList)
        setUser(data.user._id)
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, [])

  return (
    <div>
      {posts?.map((post) => {
        return (
          <div key={post._id}
            className="block rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 text-center">
            <h1 className="mt-0 mb-2 text-4xl font-medium leading-tight text-primary">
              {post.title}
            </h1>
            <h6 className="mt-0 mb-2 text-base font-medium leading-tight text-primary">
              Written by {post.user.username} on {new Date(post.time).toLocaleString('en-US', {
                year: '2-digit',
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
              })}


            </h6>
            {post.comments.length === 1 ? (
              <sub>{post.comments.length} comment </sub>
            ) : <sub>{post.comments.length} comments</sub>}
            <p style={{ whiteSpace: pFormatted.whitespace }} className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
              {post.content}
            </p>

            <TERipple>
              <Link to={`/posts/${post._id}`} className='individual-post-container' key={post._id}>
                <button
                  type="button"
                  className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                >
                  View
                </button>
              </Link>


            </TERipple>
            {post.user._id === user ? (

              <TERipple>
                <ConfirmDelete id={post._id} title={post.title} />
              </TERipple>

            ) : null}
            <hr
              className="my-12 h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50"
            />
          </div>

        )
      })}
    </div>
  )
}