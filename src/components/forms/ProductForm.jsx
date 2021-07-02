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

function ProductForm({ Field, errors, touched, submit, loading }) {
    return (
        <Box as='form' onSubmit={submit}>
            <FormControl
                id='name'
                my='.5rem'
                isInvalid={errors.name && touched.name}>
                <FormLabel color='#333'>Name</FormLabel>
                <Field
                    as={Input}
                    height='3rem'
                    _placeholder={{ color: '#555' }}
                    _focus={{ outline: 'none' }}
                    placeholder='product name'
                    type='text'
                    name='name'
                />
                <FormErrorMessage>
                    {errors.name && touched.name && errors.name}
                </FormErrorMessage>
            </FormControl>
            <FormControl
                id='price'
                my='.5rem'
                isInvalid={errors.price && touched.price}>
                <FormLabel color='#333'>Price</FormLabel>
                <Field
                    as={Input}
                    height='3rem'
                    _placeholder={{ color: '#555' }}
                    _focus={{ outline: 'none' }}
                    placeholder='your price'
                    type='number'
                    name='price'
                />
                <FormErrorMessage>
                    {errors.price && touched.price && errors.price}
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
                Create Product
            </Button>
        </Box>
    )
}

export default ProductForm
