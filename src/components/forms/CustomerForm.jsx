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

function CustomerForm({ Field, errors, touched, submit, loading, Edit }) {
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
                    placeholder='someone'
                    type='text'
                    name='name'
                />
                <FormErrorMessage>
                    {errors.name && touched.name && errors.name}
                </FormErrorMessage>
            </FormControl>
            <FormControl
                id='number'
                my='.5rem'
                isInvalid={errors.number && touched.number}>
                <FormLabel color='#333'>Customer Number</FormLabel>
                <Field
                    as={Input}
                    height='3rem'
                    _placeholder={{ color: '#555' }}
                    _focus={{ outline: 'none' }}
                    placeholder='+25713456533'
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
                {Edit ? 'Edit Customer' : 'Create Customer'}
            </Button>
        </Box>
    )
}

export default CustomerForm
