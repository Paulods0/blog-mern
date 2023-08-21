import React, { useContext, useState } from "react"
import { Navigate, Link } from "react-router-dom"
import { UserContext } from "../components/context/userContext"

import "../styles/Login.css"

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [redirect, setRedirect] = useState(false)
  const { setUserInfo } = useContext(UserContext)

  const login = async (e) => {
    e.preventDefault()

    const response = await fetch("http://localhost:4000/login", {
      method: "post",
      body: JSON.stringify({ username, password }),
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
    })

    if (response.ok) {
      response.json().then((userInfo) => {
        setUserInfo(userInfo)
        setRedirect(true)
      })
    } else {
      alert("Wrong credentials")
    }
    setUsername("")
    setPassword("")
  }

  if (redirect) {
    return <Navigate to={"/"} />
  }

  return (
    <>
      <form className="login" onSubmit={login}>
        <h1>Login</h1>
        <input
          type="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Login</button>
        <div className="create-account-link">
          <p>Don't have an account? </p>
          <Link to="/register"> Create now</Link>
        </div>
      </form>
    </>
  )
}
export default Login
