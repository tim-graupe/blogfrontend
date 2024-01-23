import React, { useState, ChangeEvent } from 'react';
import { TETextarea, TEInput } from "tw-elements-react";

interface NewPostI {
  title: string;
  content: string;
}

export const NewPost = () => {
  const [formData, setFormData] = useState<NewPostI>({
    title: '',
    content: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/new_post', {
        method: 'POST',
        credentials: "include",
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
    <div className="flex justify-center">

      <form onSubmit={handleSubmit}>

        <div className="relative mb-3 xl:w-96">
          <br />
          <TEInput label="Title" type="text" name="title" id="title" onChange={handleChange} value={formData.title} required maxLength={20} />
          <br />
        </div>
        <div>
          <br />
          <TETextarea label="Content" rows={6} name="content" id="content" value={formData.content} onChange={handleChange} required />
          <br />
        </div>

        <button
          type="submit"
          className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
        >
          Submit
        </button>

      </form>
    </div>
  )
}