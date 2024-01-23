import React, { useState, useEffect } from 'react';
import config from '../configs';
import { NavLink, Route, Routes } from 'react-router-dom';
import {
    TETabs,
    TETabsContent,
    TETabsItem,
    TETabsPane,
} from "tw-elements-react";

export const Nav: React.FC = () => {
    const [isActive, setActive] = useState("Home");
    const [isAuth, setIsAuth] = useState(false)
    const apiUrl =
        process.env.NODE_ENV === "development"
            ? config.development.apiUrl
            : config.production.apiUrl;

    useEffect(() => {
        console.log("apiUrl from nav ----=>", "https://blogbackend-production-0edb.up.railway.app")
        const checkUser = async () => {
            try {
                const response = await fetch(apiUrl, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                });


                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                if (data.isAuth) {
                    setIsAuth(true);
                } else {
                    setIsAuth(false)
                }

            } catch (error) {
                console.error('Error:', error);
            }
        };
        checkUser()
    })

    const handleClick = (value: string) => {
        if (value === isActive) {
            return;
        }
        setActive(value);
    };


    return (
        <nav className="mb-3">

            <TETabs justify>
                <TETabsItem active={isActive === "Home"}>
                    <NavLink to="/" onClick={() => handleClick("Home")}>
                        Home
                    </NavLink>
                </TETabsItem>
                <TETabsItem active={isActive === "Posts"}>
                    <NavLink to="/posts" onClick={() => handleClick("Posts")}>
                        Browse Posts
                    </NavLink>
                </TETabsItem>

                {isAuth ? (
                    <>
                        <TETabsItem active={isActive === "NewPost"}>
                            <NavLink to="/new_post" onClick={() => handleClick("NewPost")}>
                                New Post
                            </NavLink>
                        </TETabsItem>
                        <TETabsItem active={isActive === "my_posts"}>
                            <NavLink to="/my_posts" onClick={() => handleClick("my_posts")}>
                                My Posts
                            </NavLink>
                        </TETabsItem>
                        <TETabsItem active={isActive === "Logout"}>
                            <NavLink to="/logout" onClick={() => handleClick("Logout")}>
                                Logout
                            </NavLink>
                        </TETabsItem>
                    </>
                ) : (
                    <>
                        <TETabsItem active={isActive === "Register"}>
                            <NavLink to="/register" onClick={() => handleClick("Register")}>
                                Register
                            </NavLink>
                        </TETabsItem>
                        <TETabsItem active={isActive === "Login"}>
                            <NavLink to="/login" onClick={() => handleClick("Login")}>
                                Login
                            </NavLink>
                        </TETabsItem>
                    </>
                )}
            </TETabs>


            <TETabsContent>
                <TETabsPane show={isActive === "tab1"}></TETabsPane>
                <TETabsPane show={isActive === "tab2"}></TETabsPane>
                <TETabsPane show={isActive === "tab3"}></TETabsPane>
                <TETabsPane show={isActive === "tab4"}></TETabsPane>
                <TETabsPane show={isActive === "tab5"}></TETabsPane>

            </TETabsContent>
        </nav>
    );
};