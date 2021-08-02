import mongoose from 'mongoose'
import Double from '@mongoosejs/double'

const faultyProductSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
    },
    productId: {
        type: String,
        default: '',
    },
    quantity: {
        type: Double,
        default: 0,
    },

    created: {
        type: Date,
        default: Date.now,
    },
})

export const faulty =
    mongoose.model.faulty || mongoose.model('faulty', faultyProductSchema)
