import { Router } from 'express'
import { authVerify } from '../middleware/authVerify'
import { sales } from '../models/salesOrderModel'
import { customer } from '../models/customerModel'
import { product } from '../models/productModel'
import { calculateDiscountedPrice, calculateGrandTotal } from '../functions'

const router = Router()

router.post('/', async (req, res) => {
    try {
        const data = req.body

        const salesOrderName = `${data.name}${new Date().getTime()}`

        const newSalesOrder = new sales({
            ...data,
            name: salesOrderName,
        })

        const existingCustomer = await customer.findOne({
            number: data.customer.number,
        })

        if (!existingCustomer) {
            const newCustomer = new customer({
                ...data.customer,
            })

            await newCustomer.save()
        }

        if (existingCustomer) {
            await customer.findOneAndUpdate(
                { number: data.customer.number },
                { $inc: { transactions: 1 } }
            )
        }

        const item = await newSalesOrder.save()
        return res.status(201).json({ message: 'Sales order created', item })
    } catch (error) {
        return res
            .status(400)
            .json({ message: `Something went wrong: ${error}` })
    }
})

router.get('/', async (_, res) => {
    try {
        const items = await sales.find({}).sort({ created: 'desc' })
        return res.status(200).json({ items })
    } catch (error) {
        return res
            .status(400)
            .json({ message: `Something went wrong: ${error}` })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const item = await sales.findById(id)

        if (!item) {
            return res.status(404).json({ message: 'sales order not found' })
        } else {
            return res.status(200).json({ item })
        }
    } catch (error) {
        return res
            .status(400)
            .json({ message: `Something went wrong: ${error}` })
    }
})
router.get('/bydate/:from/:to', async (req, res) => {
    try {
        const { from, to } = req.params

        const fromDate = new Date(from).toISOString()
        const toDate = new Date(to).toISOString()

        const items = await sales
            .find({ created: { $gte: fromDate, $lte: toDate } })
            .sort({ created: 'desc' })

        if (!items) {
            return res.status(404).json({ message: 'sales order not found' })
        } else {
            return res.status(200).json({ items })
        }
    } catch (error) {
        return res
            .status(400)
            .json({ message: `Something went wrong: ${error}` })
    }
})

router.get('/sale/:name', async (req, res) => {
    try {
        const { name } = req.params
        const item = await sales.findOne({ name })

        if (!item) {
            return res.status(404).json({ message: 'sales order not found' })
        } else {
            return res.status(200).json({ item })
        }
    } catch (error) {
        return res
            .status(400)
            .json({ message: `Something went wrong: ${error}` })
    }
})

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params

        const update = {
            ...req.body,
            updated: Date.now(),
        }

        const item = await sales.findByIdAndUpdate(
            id,
            { $set: update },
            { new: true }
        )

        if (!item) {
            return res.status(400).json({ message: 'sales order not found' })
        } else {
            return res
                .status(200)
                .json({ message: 'sales order updated', item })
        }
    } catch (error) {
        return res
            .status(400)
            .json({ message: `something went wrong: ${error}` })
    }
})

router.put('/addproduct/:id', async (req, res) => {
    try {
        const { id } = req.params
        const data = req.body

        const salesOrder = await sales.findById(id)

        if (!sales) {
            return res.status(404).json({ message: 'Sales order not found' })
        }

        const { products } = salesOrder

        const prodExists = products.find((prod) => prod.name === data.name)

        if (prodExists) {
            return res
                .status(400)
                .json({ message: 'Product already exists in the sales order' })
        }

        const update = {
            products: [...products, data],
            status: 'in progress',
            updated: Date.now(),
        }

        const item = await sales.findByIdAndUpdate(
            id,
            { $set: update },
            { new: true }
        )

        // reduce the quantity of the product
        await product.findOneAndUpdate(
            { name: data.name },
            { $inc: { quantity: -data.quantity } }
        )

        return res
            .status(200)
            .json({ message: `${data.name} added to sales order`, item })
    } catch (error) {
        return res
            .status(400)
            .json({ message: `something went wrong: ${error}` })
    }
})

router.put('/updateproduct/:salesId/:prodName', async (req, res) => {
    try {
        const { salesId, prodName } = req.params
        let data = req.body

        const salesOrder = await sales.findById(salesId)

        if (!salesOrder) {
            return res.status(404).json({ message: 'Sales order not found' })
        }

        let { products } = salesOrder

        let prodToUpdate = products.find((prod) => prod.name === prodName)

        console.log('product to update', prodToUpdate)

        if (data.quantity > prodToUpdate.quantity) {
            // the quantity increased
            const increaseBy = data.quantity - prodToUpdate.quantity

            await product.findOneAndUpdate(
                { name: prodName },
                { $inc: { quantity: -increaseBy } }
            )
        }
        if (data.quantity < prodToUpdate.quantity) {
            // the quantity decreased
            const decreasedBy = prodToUpdate.quantity - data.quantity

            await product.findOneAndUpdate(
                { name: prodName },
                { $inc: { quantity: decreasedBy } }
            )
        }

        let newProducts = products.map((prod) => {
            if (prod.name === prodName) {
                prod = data
            }

            return prod
        })

        const update = {
            status: 'in progress',
            products: [...newProducts],
            updated: Date.now(),
        }

        const item = await sales.findByIdAndUpdate(
            salesId,
            { $set: update },
            { new: true }
        )

        return res.status(200).json({ message: `Product updated`, item })
    } catch (error) {
        return res
            .status(400)
            .json({ message: `something went wrong: ${error}` })
    }
})

router.put('/deleteproduct/:salesId/:prodName', async (req, res) => {
    try {
        const { salesId, prodName } = req.params

        const salesOrder = await sales.findById(salesId)

        if (!salesOrder) {
            return res.status(404).json({ message: 'Sales order not found' })
        }

        const { products } = salesOrder

        await products.map(async (prod) => {
            if (prod.name === prodName) {
                await product.findOneAndUpdate(
                    { name: prodName },
                    { $inc: { quantity: prod.quantity } }
                )
            }

            return prod
        })

        const filteredProducts = await products.filter(
            (prod) => prod.name !== prodName
        )

        const update = {
            status: 'in progress',
            products: [...filteredProducts],
            updated: Date.now(),
        }

        const item = await sales.findByIdAndUpdate(
            salesId,
            { $set: update },
            { new: true }
        )

        return res
            .status(200)
            .json({ message: `Product deleted from sales order`, item })
    } catch (error) {
        return res
            .status(400)
            .json({ message: `something went wrong: ${error}` })
    }
})

router.put('/completesale/:salesId', async (req, res) => {
    try {
        const { salesId } = req.params

        const salesOrder = await sales.findById(salesId)

        if (!salesOrder) {
            return res.status(404).json({ message: 'Sales order not found' })
        }

        const { products } = salesOrder

        let grandTotal = await calculateGrandTotal(products)

        if (salesOrder.discount > 0) {
            grandTotal = await calculateDiscountedPrice(
                salesOrder.discount,
                grandTotal
            )
        }

        const update = {
            grandTotal,
            status: 'completed',
            updated: Date.now(),
        }

        const item = await sales.findByIdAndUpdate(
            salesId,
            { $set: update },
            { new: true }
        )

        return res.status(200).json({ message: `Sales order updated`, item })
    } catch (error) {
        return res
            .status(400)
            .json({ message: `something went wrong: ${error}` })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params

        const item = await sales.findByIdAndDelete(id)

        if (!item) {
            return res.status(400).json({ message: 'sales order not found' })
        } else {
            return res
                .status(200)
                .json({ message: 'sales order deleted', item })
        }
    } catch (error) {
        return res
            .status(400)
            .json({ message: `something went wrong: ${error}` })
    }
})

export const salesRoutes = router
