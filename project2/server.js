require("dotenv").config({ quiet: true })
const express = require("express")
const methodOverride = require("method-override")
const session = require("express-session")
const { MongoStore } = require("connect-mongo")
const morgan = require("morgan")
const db = require("./db")
const dns = require("dns")
dns.setServers(["8.8.8.8", "1.1.1.1"])

const userRouter = require("./routes/userRouter")
const app = express()

const PORT = 3000

app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride("_method"))
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true, 
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
  })
)
app.use("/users", userRouter)

app.get("/", (req, res) => {
  res.send("Our App is connected")
})

app.listen(PORT, () => {
  console.log(`Express server is listening on port : ${PORT}`)
})
