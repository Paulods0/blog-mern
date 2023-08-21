import React from "react"
import "./Post.css"
import { formatISO9075 } from "date-fns"
import { Link } from "react-router-dom"

const Post = ({ _id, cover, title, summary, createdAt, author }) => {
  return (
    /**left */
    <div className="post">
      <div className="image-content">
        <Link to={`/post/${_id}`}>
          <img src={`http://localhost:4000/${cover}`} alt="" />
        </Link>
      </div>

      <div className="text-content">
        <div className="info">
          <div className="title">
            <Link to={`/post/${_id}`}>
              <h1>{title}</h1>
            </Link>
          </div>
          <div className="details">
            <span>
              <Link className="author">{author.username}</Link>
            </span>
            <span>
              <time>{formatISO9075(new Date(createdAt))}</time>
            </span>
          </div>
          <div className="summary">
            <p>{summary}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Post
