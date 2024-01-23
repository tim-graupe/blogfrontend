import React, { useEffect, useState } from 'react';
import { TETextarea } from "tw-elements-react";

type GetCommentsProps = {
  postId: string;
};

type Comment = {
  content: string;
  _id: string;
  user: {
    username: string,
    _id: string
  }
  time: string
}

type GetComments = {
  content: string;
}


export const GetComments: React.FC<GetCommentsProps> = ({ postId }) => {
  const [isAuth, setIsAuth] = useState(false)
  const [comments, setComments] = useState<Comment[]>([]);
  const [formData, setFormData] = useState<GetComments>({
    content: '',
  })
  const apiUrl =
    process.env.NODE_ENV === "production"
      ? process.env.apiUrl
      : "http://localhost:4000/"


  useEffect(() => {
    fetch(`${apiUrl}posts/${postId}`)
      .then(response => response.json())
      .then(data => {
        setComments(data.comments);
      })
      .catch(error => {
        console.error('Error:', error);
      });

    fetch(`${apiUrl}posts/${postId}/comments`)
      .then(response => response.json())
      .then(data => {
        setComments(data.post.comments);

      })
      .catch(error => {
        console.error('Error:', error);
      })

  }, [postId]);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await fetch('${apiUrl}', {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        if (data.isAuth) {
          setIsAuth(data.isAuth);
        }

      } catch (error) {
        console.error('Error:', error);
      }
    };
    checkUser()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }))
  }


  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}posts/${postId}/new_comment`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        mode: 'cors',
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="content"></label>
        <br />
        {isAuth ? (
          <>
            <div className='flex justify-center'>
              <div className='relative mb-3 xl:w-96'>
                <TETextarea label="Enter reply" rows={4} name="content" id="content" value={formData.content} onChange={handleChange} required></TETextarea>
              </div>
            </div>

            <button
              type="button"
              className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            >
              Reply
            </button>
          </>
        ) : <p>Please login to reply.</p>}
        <h6 className="mt-0 mb-2 text-base font-medium leading-tight text-primary">Comments</h6>

        {comments.length < 1 ? (
          <p>No comments yet. Be the first to say something!</p>
        ) : (
          comments.map((comment) => (
            <div className='comment-container' key={comment._id}>
              <p>{comment.content}</p>
              <p>{new Date(comment.time).toLocaleString('en-US', {
                year: '2-digit',
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
              })}</p>
              <p>{comment.user?.username}</p>
            </div>
          ))
        )}

      </form>
    </div>
  );
};
