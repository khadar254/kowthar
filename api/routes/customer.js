import { Router } from 'express'
import { authVerify } from '../middleware/authVerify'
import { customer } from '../models/customerModel'

const router = Router()

router.get('/', async (_, res) => {
    try {
        const items = await customer.find({}).sort({ created: 'desc' })
        return res.status(200).json({ items })
    } catch (error) {
        return res
            .status(400)
            .json({ message: `Something went wrong: ${error}` })
    }
})

router.get('/:id', authVerify, async (req, res) => {
    try {
        const { id } = req.params
        const item = await customer.findById(id)

        if (!item) {
            return res.status(404).json({ message: 'customer not found' })
        } else {
            return res.status(200).json({ item })
        }
    } catch (error) {
        return res
            .status(400)
            .json({ message: `Something went wrong: ${error}` })
    }
})

router.put('/:id', authVerify, async (req, res) => {
    try {
        const { id } = req.params

        const update = {
            ...req.body,
            updated: Date.now(),
        }

        const item = await customer.findByIdAndUpdate(
            id,
            { $set: update },
            { new: true }
        )

        if (!item) {
            return res.status(400).json({ message: 'customer not found' })
        } else {
            return res.status(200).json({ message: 'customer updated', item })
        }
    } catch (error) {
        return res
            .status(400)
            .json({ message: `something went wrong: ${error}` })
    }
})

router.delete('/:id', authVerify, async (req, res) => {
    try {
        const { id } = req.params

        const item = await customer.findByIdAndDelete(id)

        if (!item) {
            return res.status(400).json({ message: 'customer not found' })
        } else {
            return res.status(200).json({ message: 'customer deleted', item })
        }
    } catch (error) {
        return res
            .status(400)
            .json({ message: `something went wrong: ${error}` })
    }
})

export const customerRoutes = router
