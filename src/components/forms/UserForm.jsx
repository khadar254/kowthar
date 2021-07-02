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

function UserForm({ submit, errors, touched, Field, loading, status }) {
    return (
        <Box as='form' onSubmit={submit}>
            <FormControl
                id='name'
                my='.5rem'
                isInvalid={errors.name && touched.name}>
                <FormLabel color='#444'>Name</FormLabel>
                <Field
                    as={Input}
                    height='3rem'
                    _placeholder={{ color: '#555', opacity: '0.5' }}
                    _focus={{ outline: 'none' }}
                    color='#333'
                    placeholder='name'
                    type='text'
                    name='name'
                />
                <FormErrorMessage>
                    {errors.name && touched.name && errors.name}
                </FormErrorMessage>
            </FormControl>
            <FormControl
                id='username'
                my='.5rem'
                isInvalid={errors.username && touched.username}>
                <FormLabel color='#444'>Username</FormLabel>
                <Field
                    as={Input}
                    height='3rem'
                    _placeholder={{ color: '#555', opacity: '0.5' }}
                    _focus={{ outline: 'none' }}
                    color='#333'
                    placeholder='your username'
                    type='text'
                    name='username'
                />
                <FormErrorMessage>
                    {errors.username && touched.username && errors.username}
                </FormErrorMessage>
            </FormControl>
            <FormControl
                id='email'
                my='.5rem'
                isInvalid={errors.email && touched.email}>
                <FormLabel color='#444'>Email</FormLabel>
                <Field
                    as={Input}
                    height='3rem'
                    _placeholder={{ color: '#555', opacity: '0.5' }}
                    _focus={{ outline: 'none' }}
                    color='#333'
                    placeholder='your email'
                    type='text'
                    name='email'
                />
                <FormErrorMessage>
                    {errors.email && touched.email && errors.email}
                </FormErrorMessage>
            </FormControl>
            <FormControl
                id='role'
                my='.5rem'
                isInvalid={errors.role && touched.role}>
                <FormLabel color='#444'>Role</FormLabel>
                <Field
                    as={Select}
                    height='3rem'
                    _placeholder={{ color: '#555', opacity: '0.5' }}
                    _focus={{ outline: 'none' }}
                    color='#333'
                    placeholder='Select role'
                    name='role'>
                    <option value='sales'>Sales</option>
                    <option value='admin'>Admin</option>
                </Field>
                <FormErrorMessage>
                    {errors.role && touched.role && errors.role}
                </FormErrorMessage>
            </FormControl>
            <FormControl
                id='password'
                my='.5rem'
                isInvalid={errors.password && touched.password}>
                <FormLabel color='#444'>Password</FormLabel>
                <Field
                    as={Input}
                    height='3rem'
                    _placeholder={{ color: '#555', opacity: '0.5' }}
                    _focus={{ outline: 'none' }}
                    color='#333'
                    placeholder='your password'
                    type='password'
                    name='password'
                />
                <FormErrorMessage>
                    {errors.password && touched.password && errors.password}
                </FormErrorMessage>
            </FormControl>
            <FormControl
                id='confirmpassword'
                my='.5rem'
                isInvalid={errors.confirmpass && touched.confirmpass}>
                <FormLabel color='#444'>Confirm Password</FormLabel>
                <Field
                    as={Input}
                    height='3rem'
                    _placeholder={{ color: '#555', opacity: '0.5' }}
                    _focus={{ outline: 'none' }}
                    color='#333'
                    placeholder='confirm password'
                    type='password'
                    name='confirmpass'
                />
                <FormErrorMessage>
                    {errors.confirmpass &&
                        touched.confirmpass &&
                        errors.confirmpass}
                </FormErrorMessage>
            </FormControl>

            <Button
                width='100%'
                height='3rem'
                my='1rem'
                bg='cyan.600'
                color='#eee'
                fontSize='1.2rem'
                _hover={{ bg: 'cyan.700' }}
                _focus={{ outline: 'none' }}
                disabled={loading}
                borderRadius='10px'
                type='submit'
                isLoading={loading}
                spinner={<Spinner color='cyan.500' size='md' />}>
                {status ? 'Edit user' : 'Add User'}
            </Button>
        </Box>
    )
}

export default UserForm
