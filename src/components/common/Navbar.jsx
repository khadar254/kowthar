import React, { useEffect } from 'react'
import {
    Box,
    Stack,
    Tag,
    TagLabel,
    TagRightIcon,
    Heading,
    Avatar,
    HStack,
    Spinner,
    Text,
} from '@chakra-ui/react'
import { useAuth } from '../../contexts/AuthContext'
import { FaSignOutAlt } from 'react-icons/fa'
import { useHistory } from 'react-router-dom'

function Navbar() {
    const history = useHistory()
    const { user, logout, loggingout } = useAuth()

    const isAuthenticated = !!localStorage.getItem('auth-token')

    useEffect(() => {
        if (!isAuthenticated) {
            history.push('/')
        }
    }, [isAuthenticated, history])

    return (
        <Box width='100%' height='7vh' bg='#171717'>
            <Box
                as={Stack}
                direction='row'
                justifyContent='space-between'
                alignContent='center'
                width={['100%', '100%', '90%', '80%']}
                mx='auto'
                p='10px 0'
                height='100%'>
                <HStack color='#fff'>
                    <Heading size='lg'>Kowthar</Heading>
                    <Text as='small' mx='1rem'>
                        Hardware
                    </Text>
                </HStack>

                <Tag p='10px' width='auto' bg='transparent' color='#fff'>
                    <Avatar size='sm' name={user && user.name} />
                    <TagLabel mx='1rem' fontSize='1.2rem' fontWeight='600'>
                        {user && user.username}
                    </TagLabel>
                    <TagRightIcon
                        onClick={() => logout(user?._id)}
                        as={loggingout ? Spinner : FaSignOutAlt}
                        fontSize='1.2rem'
                    />
                </Tag>
            </Box>
        </Box>
    )
}

export default Navbar
