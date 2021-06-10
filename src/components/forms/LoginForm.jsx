import React from 'react'
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

function LoginForm({ Field, errors, touched, submit, loading }) {
    return (
        <Box as='form' onSubmit={submit}>
            <FormControl id='username' my='1rem'>
                <FormLabel color='#eee'>Username</FormLabel>
                <Field
                    as={Input}
                    height='3rem'
                    border='none'
                    bg='cyan.700'
                    _placeholder={{ color: '#eee' }}
                    _focus={{ outline: 'none' }}
                    color='#eee'
                    placeholder='your username'
                    type='text'
                    name='username'
                />
                <FormErrorMessage>
                    {errors.username && touched.username}
                </FormErrorMessage>
            </FormControl>
            <FormControl id='password' my='1rem'>
                <FormLabel color='#eee'>Password</FormLabel>
                <Field
                    as={Input}
                    height='3rem'
                    border='none'
                    bg='cyan.700'
                    _placeholder={{ color: '#eee' }}
                    _focus={{ outline: 'none' }}
                    color='#eee'
                    placeholder='your password'
                    type='password'
                    name='password'
                />
                <FormErrorMessage>
                    {errors.password && touched.password}
                </FormErrorMessage>
            </FormControl>
            <FormControl id='loginas' my='1rem'>
                <FormLabel color='#eee'>Login as</FormLabel>
                <Field
                    as={Select}
                    placeholder='select'
                    name='loginas'
                    height='3rem'
                    border='none'
                    bg='cyan.700'
                    color='#fff'
                    _placeholder={{ color: '#eee' }}
                    _focus={{ outline: 'none' }}>
                    <option value='admin'>Admin</option>
                    <option value='sales'>Sales</option>
                </Field>
                <FormErrorMessage>
                    {errors.loginas && touched.loginas}
                </FormErrorMessage>
            </FormControl>

            <Button
                width='100%'
                height='3rem'
                my='2rem'
                bg='#fff'
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
