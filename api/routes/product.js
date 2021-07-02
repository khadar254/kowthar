import { Router } from 'express'
import { authVerify } from '../middleware/authVerify'
import { product } from '../models/productModel'

const router = Router()

router.post('/', authVerify, async (req, res) => {
    try {
        const data = req.body

        console.log(data)

        const newProduct = new product({
            ...data,
        })
        const item = await newProduct.save()

        return res.status(201).json({ message: 'Product created', item })
    } catch (error) {
        return res
            .status(400)
            .json({ message: `Something went wrong: ${error}` })
    }
})

router.get('/', authVerify, async (_, res) => {
    try {
        const items = await product.find({}).sort({ created: 'desc' })

        if (items.length === 0) {
            return res.status(404).json({ message: 'products not found' })
        } else {
            return res.status(200).json({ items })
        }
    } catch (error) {
        return res
            .status(400)
            .json({ message: `Something went wrong: ${error}` })
    }
})

router.get('/:id', authVerify, async (req, res) => {
    try {
        const { id } = req.params
        const item = await product.findById(id)

        if (!item) {
            return res.status(404).json({ message: 'product not found' })
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

        const item = await product.findByIdAndUpdate(
            id,
            { $set: update },
            { new: true }
        )

        if (!item) {
            return res.status(400).json({ message: 'product not found' })
        } else {
            return res.status(200).json({ message: 'product updated', item })
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

        const item = await product.findByIdAndDelete(id)

        if (!item) {
            return res.status(400).json({ message: 'user not found' })
        } else {
            return res.status(200).json({ message: 'ok', item })
        }
    } catch (error) {
        return res
            .status(400)
            .json({ message: `something went wrong: ${error}` })
    }
})

export const productRoutes = router
