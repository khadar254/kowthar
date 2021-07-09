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

function SalesOrderProductForm({ Field, errors, touched, submit, loading }) {
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
                isInvalid={errors.name && touched.name}
                isRequired>
                <FormLabel color='#333'>Product</FormLabel>
                <Field
                    as={Select}
                    height='3rem'
                    _placeholder={{ color: '#999' }}
                    _focus={{ outline: 'none' }}
                    placeholder='select a product'
                    name='name'>
                    {products &&
                        products.map((product) => (
                            <option
                                key={product._id}
                                value={JSON.stringify({
                                    name: product.name,
                                    price: product.price,
                                })}>
                                {product.name}
                            </option>
                        ))}
                </Field>
                <FormErrorMessage>
                    {errors.name && touched.name && errors.name}
                </FormErrorMessage>
            </FormControl>
            <FormControl
                id='quantity'
                my='.5rem'
                isInvalid={errors.quantity && touched.quantity}>
                <FormLabel color='#333'>Quantity</FormLabel>
                <Field
                    as={Input}
                    height='3rem'
                    _placeholder={{ color: '#999' }}
                    _focus={{ outline: 'none' }}
                    placeholder='quantity'
                    type='number'
                    name='quantity'
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
                disabled={loading}
                borderRadius='10px'
                type='submit'
                isLoading={loading}
                spinner={<Spinner color='cyan.500' size='md' />}>
                Add to product
            </Button>
        </Box>
    )
}

export default SalesOrderProductForm
