import { Router } from 'express'
import { authVerify } from '../middleware/authVerify'
import { inventory } from '../models/inventoryModel'
import { product } from '../models/productModel'

const router = Router()

router.post('/', authVerify, async (req, res) => {
    try {
        const data = req.body

        const productToUpdate = await product.findById(data.productId)

        const newQuantity = productToUpdate.quantity + data.quantityAdded

        await product.findByIdAndUpdate(productToUpdate._id, {
            $set: { updated: Date.now(), quantity: newQuantity },
        })

        const newInventory = new inventory({
            ...data,
            productName: productToUpdate.name,
        })

        const item = await newInventory.save()

        return res.status(201).json({ message: 'inventory created', item })
    } catch (error) {
        return res
            .status(400)
            .json({ message: `Something went wrong: ${error}` })
    }
})

router.get('/', authVerify, async (_, res) => {
    try {
        const items = await inventory.find({}).sort({ created: 'desc' })

        if (items.length === 0) {
            return res.status(404).json({ message: 'Inventories not found' })
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
        const item = await inventory.findById(id)

        if (!item) {
            return res.status(404).json({ message: 'Inventory not found' })
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

        const item = await inventory.findByIdAndUpdate(
            id,
            { $set: update },
            { new: true }
        )

        if (!item) {
            return res.status(400).json({ message: 'inventory not found' })
        } else {
            return res.status(200).json({ message: 'inventory updated', item })
        }
    } catch (error) {
        return res
            .status(400)
            .json({ message: `something went wrong: ${error}` })
    }
})

export const inventoryRoutes = router
