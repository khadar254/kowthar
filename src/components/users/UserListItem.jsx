import React from 'react'
import { Tr, Td, IconButton, useDisclosure } from '@chakra-ui/react'
import { FaTrashAlt, FaPencilAlt, FaTimesCircle } from 'react-icons/fa'
import { useAuth } from '../../contexts/AuthContext'
import UserEditPopup from './UserEditPopup'

function UserListItem({ user }) {
    const { deleteUser } = useAuth()
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <UserEditPopup isOpen={isOpen} onClose={onClose} user={user} />
            <Tr>
                <Td>{user?.name}</Td>
                <Td>{user?.username}</Td>
                <Td>{user?.email}</Td>
                <Td>{user?.role}</Td>
                <Td>{new Date(user?.lastLoggedInAt).toLocaleString()}</Td>
                <Td>
                    {isOpen ? (
                        <IconButton
                            _focus={{ outine: 'none' }}
                            icon={<FaTimesCircle />}
                            colorScheme='cyan'
                            onClick={onClose}
                            borderRadius='10px'
                            color='#f2f2f2'
                        />
                    ) : (
                        <IconButton
                            _focus={{ outine: 'none' }}
                            icon={<FaPencilAlt />}
                            colorScheme='cyan'
                            onClick={onOpen}
                            borderRadius='10px'
                            color='#f2f2f2'
                        />
                    )}

                    {isOpen ? null : (
                        <IconButton
                            ml='0.5rem'
                            _focus={{ outine: 'none' }}
                            borderRadius='10px'
                            onClick={() => deleteUser(user?._id)}
                            icon={<FaTrashAlt />}
                            colorScheme='red'
                        />
                    )}
                </Td>
            </Tr>
        </>
    )
}

export default UserListItem
