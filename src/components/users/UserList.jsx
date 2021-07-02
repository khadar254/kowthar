import React, { lazy, Suspense, useState } from 'react'
import {
    Box,
    Table,
    Thead,
    Th,
    Tbody,
    TableCaption,
    Stack,
    Divider,
    Heading,
    HStack,
    IconButton,
} from '@chakra-ui/react'
import { Formik, Field } from 'formik'
import * as yup from 'yup'
import UserForm from '../forms/UserForm'
import { FaTimes } from 'react-icons/fa'
import { useAuth } from '../../contexts/AuthContext'

const UserListItem = lazy(() => import('./UserListItem'))

function UserList({ users, isOpen, toggle }) {
    const { updateUser, createUser, updating, creating } = useAuth()
    const [edit, setEdit] = useState(false)
    const [toEdit, setToEdit] = useState(null)

    const validator = yup.object().shape({
        name: yup.string().required('Name is required'),
        username: yup.string().required('Name is required').min(6),
        email: yup
            .string()
            .required('Email required')
            .email('Please enter a valid email'),
        role: yup.string(),
        password: yup.string().required('Password required').min(6),
        confirmpass: yup.string().when('password', {
            is: (val) => (val && val.length > 0 ? true : false),
            then: yup
                .string()
                .oneOf([yup.ref('password')], 'Passwords do not much'),
        }),
    })

    const loading = edit ? updating : creating

    return (
        <Box as={Stack} direction='row' justifyContent='space-between'>
            <Table flex='2' variant='simple'>
                <TableCaption fontSize='1rem' color='#777'>
                    Users table &bull; {users?.length} users
                </TableCaption>
                <Thead>
                    <Th fontSize='1rem'>Name</Th>
                    <Th fontSize='1rem'>Username</Th>
                    <Th fontSize='1rem'>Email</Th>
                    <Th fontSize='1rem'>Role</Th>
                    <Th fontSize='1rem'>Last loggedIn</Th>
                    <Th fontSize='1rem'>Actions</Th>
                </Thead>
                <Tbody>
                    {users &&
                        users.map((user) => (
                            <Suspense
                                key={user?._id}
                                fallback={<h1>Loading ...</h1>}>
                                <UserListItem
                                    user={user}
                                    setEdit={setEdit}
                                    setToEdit={setToEdit}
                                    toggle={toggle}
                                    edit={edit}
                                />
                            </Suspense>
                        ))}
                </Tbody>
            </Table>
        </Box>
    )
}

export default UserList
