import { Router } from 'express'
import { authVerify } from '../middleware/authVerify'
import { product } from '../models/productModel'
import { faulty } from '../models/faultyModel'

const router = Router()

router.post('/', authVerify, async (req, res) => {
    try {
        const data = req.body

        const newProduct = new faulty({
            ...data,
        })

        const item = await newProduct.save()

        if (item) {
            await product.findByIdAndUpdate(item.productId, {
                $inc: { quantity: -item.quantity },
            })
        }
        return res.status(201).json({ message: 'Faulty product added', item })
    } catch (error) {
        return res
            .status(400)
            .json({ message: `Something went wrong: ${error}` })
    }
})

router.get('/', authVerify, async (_, res) => {
    try {
        const items = await faulty.find({}).sort({ created: 'desc' })

        if (items.length === 0) {
            return res
                .status(404)
                .json({ message: 'faulty products not found' })
        } else {
            return res.status(200).json({ items })
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

        const item = await faulty.findByIdAndUpdate(
            id,
            { $set: update },
            { new: true }
        )

        if (!item) {
            return res.status(400).json({ message: 'faulty product not found' })
        } else {
            return res
                .status(200)
                .json({ message: 'faulty product updated', item })
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

        const item = await faulty.findByIdAndDelete(id)

        if (!item) {
            return res.status(400).json({ message: 'faulty product not found' })
        } else {
            await product.findByIdAndUpdate(item.productId, {
                $inc: { quantity: item.quantity },
            })
            return res
                .status(200)
                .json({ message: 'faulty product deleted', item })
        }
    } catch (error) {
        return res
            .status(400)
            .json({ message: `something went wrong: ${error}` })
    }
})

export const faultyProductRoutes = router
