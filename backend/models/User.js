import mongoose from 'mongoose'
import slugify from 'slugify'

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email field is required'],
      unique: [true, `Email already exists`],
    },
    occupation: {
      type: String,
      required: [true, 'Occupation field is required'],
    },
    phoneNumber: {
      type: String,
      required: [true, 'Phone number is required'],
    },
    slug: {
      type: String,
    },
  },
  { timestamps: true }
)

userSchema.pre('save', function (next) {
  this.slug = slugify(
    `${this.firstName} ${this.lastName} ${Math.round(Math.random() * 1e16)}`,
    {
      lower: true,
    }
  )
  next()
})

const UserModel = mongoose.model('user', userSchema)

export default UserModel
