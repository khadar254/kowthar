import { Router } from 'express'
import { authVerify } from '../middleware/authVerify'
import { user } from '../models/userModel'
import { genSalt, compare, hash } from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {
    loginValidation,
    registerValidation,
} from '../validation/userValidation'
import { keys } from '../keys'

const router = Router()

router.post('/login', async (req, res) => {
    const { error } = loginValidation(req.body)
    if (error)
        return res.status(400).json({ message: error.details[0].message })

    // check if email exists
    const existingUser = await user.findOne({ username: req.body.username })

    if (!existingUser)
        return res.status(400).json({ message: 'Email or password is wrong' })

    const validPass = await compare(req.body.password, existingUser.password)

    if (!validPass) return res.status(400).send({ message: 'Invalid password' })

    // create and assign token
    const token = jwt.sign(
        {
            id: existingUser._id,
            email: existingUser.email,
            name: existingUser.name,
            role: existingUser.role,
        },
        keys.jwtSecret
    )

    const person = { ...existingUser._doc }
    delete person.password

    res.status(200).header('auth-token', token).json({
        token,
        user: person,
        message: 'ok',
    })
})

router.post('/createuser', async (req, res) => {
    const { error } = registerValidation(req.body)

    if (error)
        return res.status(400).json({ message: error.details[0].message })

    // check if user exists
    const emailExists = await user.findOne({ email: req.body.email })

    if (emailExists) return res.status(400).json('Email already exists')

    //create hashed password
    const salt = await genSalt(12)
    const hashPass = await hash(req.body.password, salt)

    // create new user
    const newUser = new user({
        ...req.body,
        password: hashPass,
    })

    try {
        const savedUser = await newUser.save()
        res.status(201).json({ message: 'new user created', user: savedUser })
    } catch (error) {
        res.status(400).json({ message: error })
    }
})

router.get('/users', authVerify, async (_, res) => {
    const users = await user
        .find({})
        .sort({ created: 'asc' })
        .select('-password')

    try {
        if (!users.length) {
            return res
                .status(400)
                .json({ message: 'users not found', users: [] })
        } else {
            return res.status(200).json({ users, message: 'ok' })
        }
    } catch (error) {
        return res
            .status(400)
            .json({ message: `something went wrong: ${error}` })
    }
})

router.put('/user/:id', authVerify, async (req, res) => {
    try {
        const { id } = req.params

        const update = {
            ...req.body,
            updated: Date.now(),
        }

        const updatedUser = await user
            .findByIdAndUpdate(id, { $set: update }, { new: true })
            .select('-password')

        if (!updatedUser) {
            return res.status(400).json({ message: 'user not found' })
        } else {
            return res
                .status(200)
                .json({ message: 'user updated', user: updatedUser })
        }
    } catch (error) {
        return res
            .status(400)
            .json({ message: `something went wrong: ${error}` })
    }
})

router.delete('/user/:id', authVerify, async (req, res) => {
    try {
        const { id } = req.params

        const userToDelete = await user.findByIdAndDelete(id)

        if (!userToDelete) {
            return res.status(400).json({ message: 'user not found' })
        } else {
            return res.status(200).json({ message: 'ok' })
        }
    } catch (error) {
        return res
            .status(400)
            .json({ message: `something went wrong: ${error}` })
    }
})

router.get('/users/loaduser', authVerify, async (req, res) => {
    try {
        const { id } = req.user

        const person = await user.findById(id)
        if (!person) {
            return res.status(404).json({ message: 'user not found' })
        } else {
            return res.status(200).json({ user: person, message: 'ok' })
        }
    } catch (error) {
        return res
            .status(400)
            .json({ message: `something went wrong: ${error}` })
    }
})

export const authRoutes = router
