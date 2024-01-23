import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { GetComments } from './getComments';
import config from '../configs';
type Props = {}

type Post = {
  _id: string;
  title: string;
  content: string;
  comments: Comment[];

};


export const GetSinglePost = (props: Props) => {
  const [post, setPost] = useState<Post | null>(null);
  let id = useParams().id
  const apiUrl =
    process.env.NODE_ENV === "development"
      ? config.development.apiUrl
      : config.production.apiUrl;

  useEffect(() => {

    fetch(`${apiUrl}/posts/${id}`)
      .then(response => response.json())
      .then(data => {
        setPost(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });

  }, [id]);

  return (
    <div>
      {post && (
        <>
          <Link to={`/posts/`} className='individual-post-container' key={post._id}>
            <button
              type="button"
              className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            >
              Back
            </button>
          </Link>

          <h1 className="mt-0 mb-2 text-5xl font-medium leading-tight text-primary">{post.title}</h1>
          <p className="mt-0 mb-4 text-base font-light leading-relaxed">{post.content}</p>
          <GetComments postId={post._id} />
        </>
      )}
    </div>
  )
}