import { Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Layout from "./Layout"
import { UserContextProvider } from "./components/context/userContext"
import CreatePost from "./pages/CreatePost.jsx"
import Home from "./pages/Home"
import PostPage from "./pages/PostPage"

import "./App.css"
import EditPost from "./pages/EditPost"

function App() {
  return (
    <main className="App">
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/post/:id" element={<PostPage />} />
            <Route path="/edit/:id" element={<EditPost />} />
          </Route>
        </Routes>
      </UserContextProvider>
    </main>
  )
}

export default App
