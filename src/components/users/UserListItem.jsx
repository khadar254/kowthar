import React from 'react'
import { Tr, Td, IconButton } from '@chakra-ui/react'
import { FaTrashAlt, FaPencilAlt, FaTimesCircle } from 'react-icons/fa'
import { useAuth } from '../../contexts/AuthContext'

function UserListItem({ user, setEdit, edit, setToEdit, toggle }) {
    const { deleteUser } = useAuth()

    const handleEdit = () => {
        setToEdit(user)
        setEdit(true)
        toggle()
    }
    return (
        <Tr>
            <Td>{user?.name}</Td>
            <Td>{user?.username}</Td>
            <Td>{user?.email}</Td>
            <Td>{user?.role}</Td>
            <Td>{new Date(user?.lastLoggedInAt).toLocaleString()}</Td>
            <Td>
                {edit ? (
                    <IconButton
                        _focus={{ outine: 'none' }}
                        icon={<FaTimesCircle />}
                        colorScheme='cyan'
                        onClick={() => {
                            toggle()
                            setEdit(false)
                            setToEdit({})
                        }}
                        borderRadius='10px'
                        color='#f2f2f2'
                    />
                ) : (
                    <IconButton
                        _focus={{ outine: 'none' }}
                        icon={<FaPencilAlt />}
                        colorScheme='cyan'
                        onClick={handleEdit}
                        borderRadius='10px'
                        color='#f2f2f2'
                        display='none'
                    />
                )}

                {edit ? null : (
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
    )
}

export default UserListItem
