import React, { useEffect } from 'react'
import {
    FormControl,
    FormLabel,
    Input,
    FormErrorMessage,
    Box,
    Button,
    Select,
    Spinner,
} from '@chakra-ui/react'
import { useProduct } from '../../contexts/ProductContext'

function InventoryForm({ Field, errors, touched, submit, loading }) {
    const { products, fetchProducts } = useProduct()

    useEffect(() => {
        if (!products.length) {
            fetchProducts()
        }
    }, [])
    return (
        <Box as='form' onSubmit={submit}>
            <FormControl
                id='product'
                my='.5rem'
                isInvalid={errors.productId && touched.productId}
                isRequired>
                <FormLabel color='#333'>Product</FormLabel>
                <Field
                    as={Select}
                    height='3rem'
                    _placeholder={{ color: '#555' }}
                    _focus={{ outline: 'none' }}
                    placeholder='select a product'
                    name='productId'>
                    {products &&
                        products.map((product) => (
                            <option key={product._id} value={product._id}>
                                {product.name}
                            </option>
                        ))}
                </Field>
                <FormErrorMessage>
                    {errors.productId && touched.productId && errors.productId}
                </FormErrorMessage>
            </FormControl>
            <FormControl
                id='quantity'
                my='.5rem'
                isInvalid={errors.quantityAdded && touched.quantityAdded}>
                <FormLabel color='#333'>Quantity</FormLabel>
                <Field
                    as={Input}
                    height='3rem'
                    _placeholder={{ color: '#555' }}
                    _focus={{ outline: 'none' }}
                    placeholder='quantity'
                    type='number'
                    name='quantityAdded'
                />
                <FormErrorMessage>
                    {errors.quantityAdded &&
                        touched.quantityAdded &&
                        errors.quantityAdded}
                </FormErrorMessage>
            </FormControl>

            <Button
                width='100%'
                height='3rem'
                my='1rem'
                bg='cyan.600'
                color='#fff'
                fontSize='1.2rem'
                _hover={{ bg: 'cyan.700' }}
                _focus={{ outline: 'none' }}
                isDisabled={loading}
                borderRadius='10px'
                type='submit'
                isLoading={loading}>
                Add to Inventory
            </Button>
        </Box>
    )
}

export default InventoryForm
