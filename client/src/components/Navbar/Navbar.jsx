import React, { useContext, useEffect, useState } from "react"
import "./Navbar.css"
import { Link, Navigate } from "react-router-dom"
import { UserContext } from "../context/userContext"
import UserComp from "../UserComp/UserComp"

const Navbar = () => {
  const { setUserInfo, userInfo } = useContext(UserContext)

  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo)
      })
    })
  }, [])

  function logout() {
    fetch("http://localhost:4000/logout", {
      method: "post",
      credentials: "include",
    })
    setUserInfo(null)
    // return <Navigate to={"/login"} />
  }

  const userName = userInfo?.username
  // const userImg = userInfo?.photo

  return (
    <header>
      <Link to="/" className="logo">
        MyBlog
      </Link>
      <nav>
        {userName && (
          <>
            <Link to="/create">Create New Post</Link>
            <Link onClick={logout} to={"/login"}>
              Logout
            </Link>
            <div className="username-comp">
              <UserComp username={userName} />
            </div>
          </>
        )}
        {!userName && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  )
}

export default Navbar
