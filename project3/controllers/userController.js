const User = require("../models/User.js")
const bcrypt = require("bcrypt")

const testing = async (req, res) => {
  try {
    res.send("testing is successfully done")
  } catch (error) {
    res.send("Error while testing")
    console.log(error)
  }
}

const registerUser = async (req, res) => {
  try {
    const userInDB = await User.exists({ email: req.body.email })
    if (userInDB) {
      return res.send("username already taken!")
    }
    if (req.body.password !== req.body.confirmPassword) {
      return res.send("Password and Confirm Password must match ")
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 12)

    const newUser = await User.create({
      email: req.body.email,
      password: hashedPassword,
      first: req.body.first,
      last: req.body.last,
      picture: req.body.picture,
    })
    console.log(newUser)
    res.send(`Thanks for Signing up ${req.body.first}! ${newUser}`)
  } catch (error) {
    res.send("error")
  }
}

const signInUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    console.log(user)
    if (!user) {
      return res.send(
        "❌ No user has been registered with that email. Please sign up!"
      )
    }
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) {
      return res.send("❌ Incorrect password! Please try again.")
    }
    req.session.user = {
      email: user.email,
      _id: user._id,
    }
    req.session.save(() => {
      res.send(`👋 Thanks for signing in, ${user.first}!`)
    })
  } catch (error) {
    res.send(`error: ${error}`)
  }
}

const signOut = async (req, res) => {
  try {
    req.session.destroy(() => {
      res.send("user signed out")
    })
  } catch (error) {
    res.send("error")
  }
}



const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    res.send(user)
  } catch (error) {
    res.send(`Error: ${error}`)
  }
}

module.exports = {
  testing,
  signInUser,
  registerUser,
  signOut,
  getUserById,
}
