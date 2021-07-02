import mongoose from 'mongoose'
import Double from '@mongoosejs/double'

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Double,
        required: true,
    },
    quantity: {
        type: Double,
        default: 0,
    },

    updated: {
        type: Date,
        default: Date.now,
    },
    created: {
        type: Date,
        default: Date.now,
    },
})

export const product =
    mongoose.model.product || mongoose.model('product', productSchema)
