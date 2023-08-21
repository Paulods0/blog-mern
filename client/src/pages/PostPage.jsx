import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { formatISO9075 } from "date-fns"
import { Link } from "react-router-dom"
import EditIcon from "../components/EditIcon"

import "../styles/PostPage.css"

const PostPage = () => {
  const { id } = useParams()
  const [postInfo, setPostInfo] = useState(null)

  useEffect(() => {
    fetch(`http://localhost:4000/post/${id}`).then((response) => {
      response.json().then((postInfo) => {
        setPostInfo(postInfo)
      })
    })
  }, [])

  if (!postInfo) return ""

  return (
    <div className="post-page">
      <h1 className="title">{postInfo.title}</h1>
      <div className="details">
        <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
        <p>
          by @<Link className="author">{postInfo.author.username}</Link>
        </p>
        <Link className="edit-post" to={`/edit/${postInfo._id}`}>
          <button>
            Edit Post{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
              />
            </svg>
          </button>
        </Link>
      </div>
      <div className="image">
        <img src={`http://localhost:4000/${postInfo.cover}`} alt="" />
      </div>
      <div
        className="post-text"
        dangerouslySetInnerHTML={{ __html: postInfo.content }}
      />
    </div>
  )
}

export default PostPage
