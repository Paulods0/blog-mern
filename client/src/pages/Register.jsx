import React, { useState } from "react"
import "../styles/Register.css"
import { Link } from "react-router-dom"

const Register = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  // console.log(username, password)

  const register = async (e) => {
    e.preventDefault()

    const response = await fetch("http://localhost:4000/register", {
      method: "post",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (response.status === 200) {
      alert("Successfully created!")
    } else {
      alert("Register failed. Please, try again.")
    }

    setUsername("")
    setPassword("")
  }

  return (
    <>
      <form className="register" onSubmit={register}>
        <h1>Register</h1>
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
        <button>Register</button>
        <div className="login-account-link">
          <p>Already have an account? </p>
          <Link to="/login"> Login</Link>
        </div>
      </form>
    </>
  )
}

export default Register
