import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        default: 'sales',
    },

    password: {
        type: String,
        required: true,
    },
    lastLoggedInAt: {
        type: Date,
        default: Date.now,
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

export const user = mongoose.model.user || mongoose.model('user', userSchema)
