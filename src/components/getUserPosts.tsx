import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { GetComments } from './getComments';
import { TERipple } from 'tw-elements-react';
import config from '../configs';
type Props = {}

type Post = {
    _id: string;
    user: {
        _id: string;
        username: string;
    };
    title: string;
    content: string;
    comments: Comment[];

};


export const GetUserPosts = (props: Props) => {
    const [posts, setPosts] = useState<Post[]>([])
    const [user, setUser] = useState(null)

    const apiUrl =
        process.env.NODE_ENV === "development"
            ? config.development.apiUrl
            : config.production.apiUrl;

    useEffect(() => {

        fetch(`${apiUrl}/posts/:id/my_posts`, {
            credentials: 'include'
        })
            .then(response => response.json())
            .then(data => {
                setPosts(data.postList);
                setUser(data.user._id)

            })
            .catch(error => {
                console.error('Error:', error);
            });

    }, []);

    const deletePost = (id: string) => {
        fetch(`${apiUrl}delete/post/${id}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log("Post successfully deleted");
            })
            .catch(error => {
                console.error('Error!!!!!:', error);
            });
    }

    return (
        <ul>
            {posts?.map((post) => {
                return (
                    <li key={post._id}
                        className="w-full py-4 border-b-2 border-opacity-100 border-neutral-100 dark:border-opacity-50">

                        {post.title}
                        <br />
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

                        {post.user === user ? (

                            <TERipple>
                                <button
                                    onClick={() => {
                                        deletePost(post._id)
                                    }}
                                    type="button"
                                    className="inline-block rounded bg-danger px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-danger-600 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(220,76,100,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)]"
                                >
                                    Delete
                                </button>
                            </TERipple>

                        ) : null}

                    </li>

                )
            })}
        </ul>
    )
}