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

function LoginForm({ Field, errors, touched, submit, loading }) {
    return (
        <Box as='form' onSubmit={submit}>
            <FormControl
                id='username'
                my='.5rem'
                isInvalid={errors.username && touched.username}>
                <FormLabel color='#eee'>Username</FormLabel>
                <Field
                    as={Input}
                    height='3rem'
                    border='none'
                    bg='cyan.800'
                    _placeholder={{ color: '#eee', opacity: '0.5' }}
                    _focus={{ outline: 'none' }}
                    color='#eee'
                    placeholder='your username'
                    type='text'
                    name='username'
                />
                <FormErrorMessage color='red.200'>
                    {errors.username && touched.username && errors.username}
                </FormErrorMessage>
            </FormControl>
            <FormControl
                id='password'
                my='.5rem'
                isInvalid={errors.password && touched.password}>
                <FormLabel color='#eee'>Password</FormLabel>
                <Field
                    as={Input}
                    height='3rem'
                    border='none'
                    bg='cyan.800'
                    _placeholder={{ color: '#eee', opacity: '0.5' }}
                    _focus={{ outline: 'none' }}
                    color='#eee'
                    placeholder='your password'
                    type='password'
                    name='password'
                />
                <FormErrorMessage color='red.200'>
                    {errors.password && touched.password && errors.password}
                </FormErrorMessage>
            </FormControl>

            <Button
                width='100%'
                height='3rem'
                my='1rem'
                bg='#fff'
                color='#444'
                fontSize='1.2rem'
                _hover={{ bg: '#fff' }}
                _focus={{ outline: 'none' }}
                disabled={loading}
                borderRadius='10px'
                type='submit'
                isLoading={loading}
                spinner={<Spinner color='cyan.500' size='md' />}>
                Login
            </Button>
        </Box>
    )
}

export default LoginForm
