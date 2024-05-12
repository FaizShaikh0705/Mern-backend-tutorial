import mongoose from 'mongoose'
import { ROLES } from '../utils/constants.js'

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      default: ROLES.CUSTOMER,
    }
  },
  {
    timestamps: true,
  }
)


const User = mongoose.model('User', userSchema)

export default User;