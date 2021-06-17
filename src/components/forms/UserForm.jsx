import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Select,
    Spinner,
} from '@chakra-ui/react'
import React from 'react'

function UserForm({ submit, errors, touched, Field, loading }) {
    return (
        <Box as='form' onSubmit={submit}>
            <FormControl
                id='name'
                my='.5rem'
                isInvalid={errors.name && touched.name}>
                <FormLabel color='#eee'>Name</FormLabel>
                <Field
                    as={Input}
                    height='3rem'
                    border='none'
                    bg='#eee'
                    _placeholder={{ color: '#eee', opacity: '0.5' }}
                    _focus={{ outline: 'none' }}
                    color='#eee'
                    placeholder='name'
                    type='text'
                    name='name'
                />
                <FormErrorMessage color='red.200'>
                    {errors.name && touched.name && errors.name}
                </FormErrorMessage>
            </FormControl>
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
                id='email'
                my='.5rem'
                isInvalid={errors.email && touched.email}>
                <FormLabel color='#eee'>Email</FormLabel>
                <Field
                    as={Input}
                    height='3rem'
                    border='none'
                    bg='cyan.800'
                    _placeholder={{ color: '#eee', opacity: '0.5' }}
                    _focus={{ outline: 'none' }}
                    color='#eee'
                    placeholder='your email'
                    type='text'
                    name='email'
                />
                <FormErrorMessage color='red.200'>
                    {errors.email && touched.email && errors.email}
                </FormErrorMessage>
            </FormControl>
            <FormControl
                id='role'
                my='.5rem'
                isInvalid={errors.role && touched.role}>
                <FormLabel color='#eee'>Role</FormLabel>
                <Field
                    as={Select}
                    height='3rem'
                    border='none'
                    bg='cyan.800'
                    _placeholder={{ color: '#eee', opacity: '0.5' }}
                    _focus={{ outline: 'none' }}
                    color='#eee'
                    placeholder='Select role'
                    name='role'>
                    <option value='sales'>Sales</option>
                    <option value='admin'>Admin</option>
                </Field>
                <FormErrorMessage color='red.200'>
                    {errors.role && touched.role && errors.role}
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
            <FormControl
                id='confirmpassword'
                my='.5rem'
                isInvalid={errors.confirmpass && touched.confirmpass}>
                <FormLabel color='#eee'>Password</FormLabel>
                <Field
                    as={Input}
                    height='3rem'
                    border='none'
                    bg='cyan.800'
                    _placeholder={{ color: '#eee', opacity: '0.5' }}
                    _focus={{ outline: 'none' }}
                    color='#eee'
                    placeholder='confirm password'
                    type='password'
                    name='confirmpass'
                />
                <FormErrorMessage color='red.200'>
                    {errors.confirmpass &&
                        touched.confirmpass &&
                        errors.confirmpass}
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

export default UserForm
