import React from 'react'
import { Tr, Td, IconButton, useDisclosure } from '@chakra-ui/react'
import { FaTrashAlt, FaPencilAlt, FaTimesCircle } from 'react-icons/fa'
import { useAuth } from '../../contexts/AuthContext'
import UserEditPopup from './UserEditPopup'
import DeleteDrawer from '../common/DeleteDrawer'

function UserListItem({ user }) {
    const { deleteUser, user: currentUser, deleting } = useAuth()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const {
        isOpen: delIsOpen,
        onOpen: delOpen,
        onClose: delClose,
    } = useDisclosure()

    return (
        <>
            <UserEditPopup isOpen={isOpen} onClose={onClose} user={user} />
            <DeleteDrawer
                isOpen={delIsOpen}
                onClose={delClose}
                deleteFunc={deleteUser}
                id={user?._id}
                loading={deleting}
            />
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

                    {currentUser?.username === user?.username ? null : (
                        <IconButton
                            ml='0.5rem'
                            _focus={{ outine: 'none' }}
                            borderRadius='10px'
                            onClick={delOpen}
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
