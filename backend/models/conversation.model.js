import mongoose from "mongoose";


const conversationSchema = new mongoose.Schema({
  participatns: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }
  ],
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message',
      default: [],
    },
  ],
}, {timestamps: true})

const Converation = mongoose.model('Conversation', conversationSchema)

export default Converation