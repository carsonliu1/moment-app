import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/user.js'

export const signin = async (req, res) => {

  const { email, password } = req.body

  try {
    const existingUser = await User.findOne({ email })

    if (!existingUser) return res.status(404).json({ message: 'User does not exist' })

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)

    if (!isPasswordCorrect) return res.status(404).json({ message: 'Invalid password ' })

    const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.SECRET, { expiresIn: '1h' })

    res.status(200).json({ result: existingUser, token })
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong.' })
  }
}

export const signup = async (req, res) => {

  const { email, firstName, lastName, password, confirmPassword } = req.body

  try {
    const existingUser = await User.findOne({ email })

    if (existingUser) return res.status(400).json({ message: 'User already exists' })

    if (password !== confirmPassword) return res.status(400).json({ message: 'Passwords do not match' })

    const hashed = await bcrypt.hash(password, 12)

    const result = await User.create({ email, password: hashed, name: `${firstName} ${lastName}` })
    delete.result.password

    const token = jwt.sign({ email: result.email, id: result._id }, process.env.SECRET, { expiresIn: '1h' })

    res.status(200).json({ result, token })
  } catch (err) {

    res.status(500).json({ message: 'Something went wrong.' })
  }
}
