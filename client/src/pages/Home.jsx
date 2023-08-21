import React, { useEffect, useState } from "react"
import Post from "../components/Post/Post"

const Home = () => {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    fetch("http://localhost:4000/post").then((resposnse) => {
      resposnse.json().then((posts) => {
        setPosts(posts)
      })
    })
  }, [])

  return (
    <>
      {posts.length > 0 &&
        posts.map((post, index) => <Post key={index} {...post} />)}
    </>
  )
}

export default Home
