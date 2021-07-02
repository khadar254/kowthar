import mongoose from 'mongoose'

const inventorySchema = new mongoose.Schema({
    productId: {
        type: String,
        defaut: '',
    },
    quantityAdded: {
        type: Number,
        default: 0,
    },
    userName: {
        type: String,
        required: true,
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

export const inventory =
    mongoose.model.inventory || mongoose.model('inventory', inventorySchema)
