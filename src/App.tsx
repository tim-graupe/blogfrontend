import React, { useReducer, useState } from 'react';
import { Register } from './components/auth/register';
import { Login } from './components/auth/login';
import { NewPost } from './components/new_post';
import { GetPosts } from './components/getPosts';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GetSinglePost } from './components/getSinglePost';
import { Nav } from './components/nav';
import { Logout } from './components/logout';
import { ThemeSwitcher } from './components/themeSwitcher';
import { GetUserPosts } from './components/getUserPosts';
import { Home } from './components/home';
interface State {
  isAuth: boolean;
}

type Action = { type: 'toggle' };
const initialState: State = { isAuth: false };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'toggle':
      return { isAuth: !state.isAuth }
  }
}

const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (

    <BrowserRouter>
      <Nav />
      <ThemeSwitcher />

      {/* <Nav isAuth={state.isAuth} dispatch={dispatch} /> */}
      <div className="App">
        <Routes>
          <Route path='/' element={<Home />} />

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={< Login />} />
          <Route path='/logout' element={<Logout dispatch={dispatch} />} />
          <Route path='/new_post' element={<NewPost />} />
          <Route path='/my_posts' element={<GetUserPosts />} />
          <Route path='/posts' element={<GetPosts />} />
          <Route path='/posts/:id' element={<GetSinglePost />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
