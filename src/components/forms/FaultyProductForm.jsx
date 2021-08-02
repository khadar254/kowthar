import React, { useEffect } from 'react'
import {
    FormControl,
    FormLabel,
    Input,
    Select,
    FormErrorMessage,
    Box,
    Button,
    Spinner,
} from '@chakra-ui/react'
import { useProduct } from '../../contexts/ProductContext'

function FaultyProductForm({ Field, errors, touched, submit, loading }) {
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
                isInvalid={errors.product && touched.product}
                isRequired>
                <FormLabel color='#333'>Product</FormLabel>
                <Field
                    as={Select}
                    height='3rem'
                    _placeholder={{ color: '#555' }}
                    _focus={{ outline: 'none' }}
                    placeholder='select a product'
                    name='product'>
                    {products &&
                        products.map((product) => (
                            <option
                                key={product._id}
                                value={JSON.stringify({
                                    id: product._id,
                                    name: product.name,
                                })}>
                                {product.name}
                            </option>
                        ))}
                </Field>
                <FormErrorMessage>
                    {errors.product && touched.product && errors.product}
                </FormErrorMessage>
            </FormControl>
            <FormControl
                id='price'
                my='.5rem'
                isInvalid={errors.quantity && touched.quantity}>
                <FormLabel color='#333'>Quantity</FormLabel>
                <Field
                    as={Input}
                    height='3rem'
                    _placeholder={{ color: '#555' }}
                    _focus={{ outline: 'none' }}
                    placeholder='add quantity'
                    type='number'
                    name='quantity'
                />
                <FormErrorMessage>
                    {errors.quantity && touched.quantity && errors.quantity}
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
                isLoading={loading}
                spinner={<Spinner color='cyan.500' size='md' />}>
                Add Faulty Product
            </Button>
        </Box>
    )
}

export default FaultyProductForm
