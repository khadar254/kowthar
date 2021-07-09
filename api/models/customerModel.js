import mongoose from 'mongoose'

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    number: {
        type: String,
        required: true,
    },

    created: {
        type: Date,
        default: Date.now,
    },
})

export const customer =
    mongoose.model.customer || mongoose.model('customer', customerSchema)
