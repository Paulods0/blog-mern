import React, { useEffect, useState } from "react"
import "../styles/CreatePost.css"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import { Navigate, useParams } from "react-router-dom"

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }],
    ["link", "image"],
    ["clean"],
  ],
}

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
]
const EditPost = () => {
  const [title, setTitle] = useState("")
  const [summary, setSummary] = useState("")
  const [content, setContent] = useState("")
  const [files, setFiles] = useState("")
  const [redirect, setRedirect] = useState(false)

  const { id } = useParams()

  useEffect(() => {
    fetch(`http://localhost:4000/post/${id}`).then((response) => {
      response.json().then((postInfo) => {
        setSummary(postInfo.summary)
        setTitle(postInfo.title)
        setContent(postInfo.content)
      })
    })
  }, [id])

  const updatePost = async (e) => {
    e.preventDefault()

    const data = new FormData()

    data.set("title", title)
    data.set("summary", summary)
    data.set("content", content)
    data.set("id", id)

    if (files?.[0]) {
      data.set("file", files?.[0])
    }
    const response = await fetch("http://localhost:4000/post", {
      method: "PUT",
      body: data,
      credentials: "include",
    })

    if (response.ok) {
      setRedirect(true)
    }
  }

  if (redirect) {
    return <Navigate to={`/post/${id}`} />
  }

  return (
    <div className="create-post-container">
      <form onSubmit={updatePost}>
        <h1
          style={{ color: "black", textAlign: "center", marginBottom: "2rem" }}
        >
          Edit Post
        </h1>
        <input
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          value={title}
          placeholder="Title"
        />
        <input
          onChange={(e) => setSummary(e.target.value)}
          type="summary"
          value={summary}
          placeholder="Summary"
        />
        <input type="file" onChange={(e) => setFiles(e.target.files)} />
        <ReactQuill
          value={content}
          onChange={(newValue) => setContent(newValue)}
          modules={modules}
          formats={formats}
        />
        <button>Edit Post</button>
      </form>
    </div>
  )
}

export default EditPost
