import React from 'react'
import { Tr, Td, IconButton } from '@chakra-ui/react'
import { FaTrashAlt, FaPencilAlt } from 'react-icons/fa'
import { useAuth } from '../../contexts/AuthContext'

function UserListItem({ user }) {
    const { deleteUser } = useAuth()
    return (
        <Tr>
            <Td>{user?.name}</Td>
            <Td>{user?.username}</Td>
            <Td>{user?.email}</Td>
            <Td>{user?.role}</Td>
            <Td>{new Date(user?.lastLoggedInAt).toLocaleString()}</Td>
            <Td>
                <IconButton
                    _focus={{ outine: 'none' }}
                    icon={<FaPencilAlt />}
                    colorScheme='cyan'
                    borderRadius='10px'
                    color='#f2f2f2'
                />
                <IconButton
                    ml='0.5rem'
                    _focus={{ outine: 'none' }}
                    borderRadius='10px'
                    onClick={() => deleteUser(user?._id)}
                    icon={<FaTrashAlt />}
                    colorScheme='red'
                />
            </Td>
        </Tr>
    )
}

export default UserListItem
