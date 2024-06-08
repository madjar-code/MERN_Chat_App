import express from 'express'
import {
  sendMessage,
  getMessages
} from '../controlles/message.conroller.js'
import protectRoute from '../middleware/protectRoute.js'


const router = express.Router()

router.post('/:id', protectRoute, getMessages)
router.post('/send/:userId', protectRoute, sendMessage)

export default router