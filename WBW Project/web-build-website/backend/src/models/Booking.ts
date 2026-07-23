import mongoose from 'mongoose'

const bookingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    company: {
      type: String,
      default: 'Not provided',
    },

    email: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    budget: {
      type: String,
      default: 'Not selected',
    },

    date: {
      type: String,
      required: true,
    },

    timeSlot: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

const Booking = mongoose.model('Booking', bookingSchema)

export default Booking