import React from 'react'
import {
    FormControl,
    FormLabel,
    Input,
    FormErrorMessage,
    Box,
    Button,
    Spinner,
} from '@chakra-ui/react'

function SalesProductForm({ Field, errors, touched, submit, loading }) {
    return (
        <Box as='form' onSubmit={submit}>
            <FormControl
                id='price'
                my='.5rem'
                isInvalid={errors.price && touched.price}
                isRequired>
                <FormLabel color='#333'>Price</FormLabel>
                <Field
                    as={Input}
                    height='3rem'
                    _placeholder={{ color: '#999' }}
                    _focus={{ outline: 'none' }}
                    placeholder='select a product'
                    type='number'
                    name='price'
                />
                <FormErrorMessage>
                    {errors.price && touched.price && errors.price}
                </FormErrorMessage>
            </FormControl>
            <FormControl
                id='quantity'
                my='.5rem'
                isRequired
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
                disabled={loading}
                borderRadius='10px'
                type='submit'
                isLoading={loading}
                spinner={<Spinner color='cyan.500' size='md' />}>
                Edit Product
            </Button>
        </Box>
    )
}

export default SalesProductForm
