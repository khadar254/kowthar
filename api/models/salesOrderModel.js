import mongoose from 'mongoose'
import Double from '@mongoosejs/double'

const salesOrderSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    customer: {
        type: Object,
        required: true,
    },
    products: {
        type: [Object],
        default: [],
    },
    grandTotal: {
        type: Double,
        default: 0.0,
    },
    status: {
        type: String,
        default: 'new',
    },
    salesBy: {
        type: String,
        required: true,
    },
    discount: {
        type: Number,
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

export const sales =
    mongoose.model.sales || mongoose.model('sales', salesOrderSchema)
