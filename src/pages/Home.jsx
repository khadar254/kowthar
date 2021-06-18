import React from 'react'
import {
    Box,
    Button,
    Center,
    Heading,
    Icon,
    Image,
    Stack,
    Text,
} from '@chakra-ui/react'
import { MdDashboard } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

function Home() {
    const { isAuthenticated, user } = useAuth()
    return (
        <Box width='100%' height='100vh' overflow='hidden' bg='#eee'>
            <Box width='70%' mx='auto' p='20px 0'>
                <Center as={Stack} direction='column' color='#333'>
                    <Heading size={['2xl']} as='h1'>
                        Kowthar
                    </Heading>
                    <Text as='small' fontSize='1.3rem'>
                        Hardware
                    </Text>
                </Center>
            </Box>
            <Box
                width='70%'
                height='70vh'
                borderRadius='20px'
                mx='auto'
                position='relative'
                my='1rem'>
                <Image
                    src='/images/hardware.jpg'
                    width='100%'
                    height='100%'
                    objectFit='cover'
                    borderRadius='20px'
                />
                <Box
                    position='absolute'
                    width='100%'
                    height='100%'
                    bg='#0006117e'
                    borderRadius='20px'
                    p='20px'
                    top='0'
                    left='0'>
                    <Box
                        as={Stack}
                        justifyContent='center'
                        alignItems='center'
                        height='100%'>
                        <Heading
                            color='#fff'
                            size='2xl'
                            width='60%'
                            my='2rem'
                            textAlign='center'
                            mx='auto'>
                            Kowthar Management Platform
                        </Heading>

                        <Button
                            as={Link}
                            to='/login'
                            my='2rem'
                            bg='cyan.700'
                            color='#fff'
                            borderRadius='10px'
                            p='20px'
                            _hover={{ bg: 'cyan.800' }}
                            _focus={{ outline: 'none' }}
                            height='3.5rem'>
                            <Icon
                                mr='0.7rem'
                                as={MdDashboard}
                                fontSize='1.6rem'
                            />
                            {isAuthenticated ? (
                                <Text fontWeight='500' fontSize='1.2rem'>
                                    Hi {user.username}, go back to dashboard
                                </Text>
                            ) : (
                                <Text fontWeight='500' fontSize='1.2rem'>
                                    Login into dashboard
                                </Text>
                            )}
                        </Button>
                    </Box>
                </Box>
            </Box>

            <Box
                as={Stack}
                justifyContent='center'
                alignItems='center'
                p='20px'>
                <Text fontSize='1.2rem' color='#333'>
                    &copy; Copyright Kowthar Hardware &bull;{' '}
                    {new Date().getFullYear()}
                </Text>
            </Box>
        </Box>
    )
}

export default Home
