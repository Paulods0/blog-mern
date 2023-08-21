//Akm2uBVVg4hD5SsD
//mongodb+srv://blog:Akm2uBVVg4hD5SsD@cluster0.deevp9y.mongodb.net/?retryWrites=true&w=majority
//mongodb+srv://blog:Akm2uBVVg4hD5SsD@cluster0.deevp9y.mongodb.net/?retryWrites=true&w=majority
//mongodb+srv://blog:Akm2uBVVg4hD5SsD@cluster0.deevp9y.mongodb.net/?retryWrites=true&w=majority

const express = require("express")

const cors = require("cors")
const bcrypt = require("bcryptjs")
const cookieParser = require("cookie-parser")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")

const fs = require("fs")
const multer = require("multer")

const User = require("./models/User.js")
const Post = require("./models/Post.js")

const uploadMiddleware = multer({ dest: "/uploads" })

const app = express()

const salt = bcrypt.genSaltSync(10)
const secret = "adkfnfe98ewbvdaiewf"

app.use(cors({ credentials: true, origin: "http://localhost:3000" }))
app.use(express.json())
app.use(cookieParser())
app.use("/uploads", express.static(__dirname + "/uploads"))

const connect = async () => {
  await mongoose.connect(
    "mongodb+srv://blog:Akm2uBVVg4hD5SsD@cluster0.deevp9y.mongodb.net/?retryWrites=true&w=majority"
  )
}

//register router:
app.post("/register", async (req, res) => {
  const { username, password } = req.body

  try {
    const newUser = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
    })
    res.json(newUser)
  } catch (error) {
    res.status(500).json({ message: error })
  }
})

app.get("/register", async (req, res) => {
  try {
    const users = await User.find()
    res.json({ data: users })
  } catch (error) {
    res.status(404).json(error)
  }
})

//login route:
app.post("/login", async (req, res) => {
  const { username, password } = req.body

  const userLogged = await User.findOne({ username })
  const userPassword = bcrypt.compareSync(password, userLogged.password)
  if (userPassword) {
    //logged in
    jwt.sign({ username, id: userLogged._id }, secret, {}, (err, token) => {
      if (err) throw err
      res.cookie("token", token).json({
        id: userLogged._id,
        username,
      })
    })
  } else {
    res.status(400).json("Wrong credentials")
  }
})

//profile route:
app.get("/profile", (req, res) => {
  const { token } = req.cookies
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) throw err
    res.json(info)
  })
})

//logout route:
app.post("/logout", (req, res) => {
  res.cookie("token", " ").json("OK")
})

//post route:
app.post("/post", uploadMiddleware.single("file"), async (req, res) => {
  const { originalname, path } = req.file
  const parts = originalname.split(".")
  const ext = parts[parts.length - 1]
  const newPath = "uploads/" + path.replace(/^.*[\\\/]/, "") + "." + ext

  fs.renameSync(path, newPath)

  const { token } = req.cookies
  jwt.verify(token, secret, {}, async (err, info) => {
    const { title, summary, content } = req.body
    const postDoc = await Post.create({
      title,
      summary,
      content,
      cover: newPath,
      author: info.id,
    })
    res.json(postDoc)
  })
})

//get post route:
app.get("/post", async (req, res) => {
  res.json(
    await Post.find()
      .populate("author", ["username"])
      .sort({ createdAt: -1 })
      .limit(20)
  )
})

//get single post route:
app.get("/post/:id", async (req, res) => {
  const { id } = req.params
  const response = await Post.findById(id).populate("author", ["username"])
  res.json(response)
})

//edit post route:
app.put("/post", uploadMiddleware.single("file"), async (req, res) => {
  let newPath = null
  if (req.file) {
    const { originalname, path } = req.file
    const parts = originalname.split(".")
    const ext = parts[parts.length - 1]
    newPath = "uploads/" + path.replace(/^.*[\\\/]/, "") + "." + ext
    fs.renameSync(path, newPath)
  }

  const { token } = req.cookies
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) {
      throw err
    }

    const { id, title, summary, content } = req.body
    const postDoc = await Post.findById(id)
    const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id)
    if (!isAuthor) {
      res.status(400).json({ message: "You're not the author!" })
    }

    await postDoc.updateOne({
      title,
      summary,
      content,
      cover: newPath ? newPath : postDoc.cover,
    })

    res.json(postDoc)
  })
})
app.delete("/post", uploadMiddleware.single("file"), async (req, res) => {
  let newPath = null
  if (req.file) {
    const { originalname, path } = req.file
    const parts = originalname.split(".")
    const ext = parts[parts.length - 1]
    newPath = "uploads/" + path.replace(/^.*[\\\/]/, "") + "." + ext
    fs.renameSync(path, newPath)
  }

  const { token } = req.cookies
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) {
      throw err
    }

    const { id, title, summary, content } = req.body
    const postDoc = await Post.findById(id)
    const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id)
    if (!isAuthor) {
      res.status(400).json({ message: "You're not the author!" })
    }

    await postDoc.deleteOne({
      title,
      summary,
      content,
      cover: newPath ? newPath : postDoc.cover,
    })

    res.json(postDoc)
  })
})

app.listen(4000, () => {
  connect()
  console.log("Server's running!")
})
