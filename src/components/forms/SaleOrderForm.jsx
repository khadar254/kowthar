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

function SalesOrderForm({ Field, errors, touched, submit, loading, Edit }) {
    return (
        <Box as='form' onSubmit={submit}>
            <FormControl
                id='name'
                my='.5rem'
                isRequired
                isInvalid={errors.name && touched.name}>
                <FormLabel color='#333'>Sales Order Name</FormLabel>
                <Field
                    as={Input}
                    height='3rem'
                    _placeholder={{ color: '#999' }}
                    _focus={{ outline: 'none' }}
                    placeholder='Sales order name'
                    type='text'
                    name='name'
                />
                <FormErrorMessage>
                    {errors.name && touched.name && errors.name}
                </FormErrorMessage>
            </FormControl>
            <FormControl
                id='name'
                my='.5rem'
                isRequired
                isInvalid={errors.customer && touched.customer}>
                <FormLabel color='#333'>Customer Name</FormLabel>
                <Field
                    as={Input}
                    height='3rem'
                    _placeholder={{ color: '#999' }}
                    _focus={{ outline: 'none' }}
                    placeholder='Customer name'
                    type='text'
                    name='customer'
                />
                <FormErrorMessage>
                    {errors.customer && touched.customer && errors.customer}
                </FormErrorMessage>
            </FormControl>
            <FormControl
                id='price'
                my='.5rem'
                isRequired
                isInvalid={errors.number && touched.number}>
                <FormLabel color='#333'>Customer Number</FormLabel>
                <Field
                    as={Input}
                    height='3rem'
                    _placeholder={{ color: '#999' }}
                    _focus={{ outline: 'none' }}
                    placeholder='+254722023456'
                    type='text'
                    name='number'
                />
                <FormErrorMessage>
                    {errors.number && touched.number && errors.number}
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
                {Edit ? 'Edit Sales Order' : 'Create Sales Order'}
            </Button>
        </Box>
    )
}

export default SalesOrderForm
