import express from "express"
import dotenv from 'dotenv'
import authRoutes from './routes/auth.routes.js'
import connectToMongoDB from "./db/connectToMongoDB.js"

dotenv.config()
const PORT = process.env.PORT || 5000

const app = express()

app.get('/', (req, res) => {
  // root route
  res.send('Hello World!!')
})

app.use('/api/auth', authRoutes)

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server running on port ${PORT}`)
})
