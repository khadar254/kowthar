import React, { lazy, Suspense } from 'react'
import {
    Box,
    Table,
    Thead,
    Th,
    Tbody,
    TableCaption,
    Stack,
} from '@chakra-ui/react'

const UserListItem = lazy(() => import('./UserListItem'))

function UserList({ users, isOpen }) {
    return (
        <Box as={Stack} direction='row' justifyContent='space-between'>
            <Table flex='2' variant='simple'>
                <TableCaption fontSize='1rem' color='#777'>
                    Users table &bull; {users.length} users
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
                                <UserListItem user={user} />
                            </Suspense>
                        ))}
                </Tbody>
            </Table>
            <Box
                flex='1'
                height='auto'
                display={isOpen ? 'block' : 'none'}>
                    
                </Box>
        </Box>
    )
}

export default UserList
