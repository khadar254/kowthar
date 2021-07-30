import React, { useEffect, useState } from 'react'
import {
    Box,
    Heading,
    HStack,
    Divider,
    IconButton,
    Button,
    useDisclosure,
} from '@chakra-ui/react'
import Navbar from '../components/common/Navbar'
import { FaChevronLeft } from 'react-icons/fa'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import UserList from '../components/users/UserList'
import UserAddPopup from '../components/users/UserAddPopup'

function Users() {
    const history = useHistory()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { fetchUsers, user, users } = useAuth()

    useEffect(() => {
        fetchUsers()
    }, [fetchUsers, user?.role, history])
    return (
        <>
            <Navbar />
            <UserAddPopup isOpen={isOpen} onClose={onClose} />
            <Box
                height='auto'
                minHeight='93vh'
                overflow='hidden'
                width='100%'
                bg='#eee'>
                <Box
                    mx='auto'
                    width={['100%', '100%', '90%', '80%']}
                    p='30px 0'>
                    <HStack width='100%' justifyContent='space-between'>
                        <HStack>
                            <IconButton
                                onClick={() => history.push('/dashboard')}
                                icon={<FaChevronLeft />}
                                bg='cyan.600'
                                color='#fff'
                                borderRadius='10px'
                                _hover={{ bg: 'cyan.700' }}
                                mr='2rem'
                            />
                            <Heading>Manage Users</Heading>
                        </HStack>
                        <Button
                            bg='cyan.600'
                            width='10%'
                            onClick={onOpen}
                            height='3rem'
                            color='#fff'
                            borderRadius='10px'
                            _focus={{ outline: 'none' }}
                            _hover={{ bg: 'cyan.600' }}>
                            Add User
                        </Button>
                    </HStack>
                    <Divider my='1rem' border='2px solid #eee' />

                    <UserList users={users} isOpen={isOpen} />
                </Box>
            </Box>
        </>
    )
}

export default Users
