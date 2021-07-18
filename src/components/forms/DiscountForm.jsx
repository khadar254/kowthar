import React from 'react'
import {
    FormControl,
    FormLabel,
    Input,
    FormErrorMessage,
    Box,
    Button,
} from '@chakra-ui/react'

function DiscountForm({ Field, errors, touched, submit, loading }) {
    return (
        <Box as='form' onSubmit={submit}>
            <FormControl
                id='discount'
                my='.5rem'
                isInvalid={errors.discount && touched.discount}>
                <FormLabel color='#333'>Discount</FormLabel>
                <Field
                    as={Input}
                    height='3rem'
                    _placeholder={{ color: '#555' }}
                    _focus={{ outline: 'none' }}
                    placeholder='eg . 10 or 40'
                    type='number'
                    name='discount'
                />
                <FormErrorMessage>
                    {errors.discount && touched.discount && errors.discount}
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
                Add discount
            </Button>
        </Box>
    )
}

export default DiscountForm
