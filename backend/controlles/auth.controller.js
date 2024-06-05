import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import generateTokenAndSetCookie from '../utils/generateToken.js'

export const signup = async (req, res) => {
  try {
    const {
      fullName,
      username,
      password,
      confirmPassword,
      gender
    } = req.body
    if (password !== confirmPassword) {
      return res.status(400).json({error: "Password don't match"})
    }
    const user = await User.findOne({username})

    if (user) {
      return res.status(400).json({error: "Username already exists"})
    }

    // HASH PASSWORD HERE
    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password, salt)

    // https://
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === 'male' ? boyProfilePic : girlProfilePic
    })
    // await newUser.save()
    // res.status(201).json({
    //   _id: newUser._id,
    //   fullName: newUser.fullName,
    //   user: newUser.username,
    //   profilePic: newUser.profilePic
    // })
    if (newUser) {
      // Generate JWT token here
      generateTokenAndSetCookie(newUser._id, res)
      await newUser.save()
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        user: newUser.username,
        profilePic: newUser.profilePic
      })
    } else {
      res.status(400).json({ error: "Invalid user data" })
    }
  } catch (error) {
    console.log("Error in signup controller", error.message)
    res.status(500).json({ error: "Internal Server Error" })
  }
}

export const login = (req, res) => {
  console.log('loginUser')
}

export const logout = (req, res) => {
  console.log('logoutUser')
}