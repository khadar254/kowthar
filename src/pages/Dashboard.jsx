import React from 'react'
import { Box, Heading, Divider, Stack, Text } from '@chakra-ui/react'
import Navbar from '../components/common/Navbar'
import { useAuth } from '../contexts/AuthContext'
import OptionsList from '../components/dashboard/OptionsList'

function Dashboard() {
    const { user } = useAuth()
    return (
        <>
            <Navbar />
            <Box bg='#eee' width='100%' height='93vh' overflow='hidden'>
                <Box mx='auto' width='80%' height='auto' minH='60vh' p='20px 0'>
                    <Stack
                        direction='column'
                        justifyContent='space-between'
                        alignItems='flex-start'>
                        <Heading size='2xl' mt='1rem'>
                            Welcome, {user && user.username}
                        </Heading>

                        <Text as='p'>
                            Last logIn &bull;{' '}
                            {new Date(
                                user && user.lastLoggedInAt
                            ).toLocaleString()}
                        </Text>
                    </Stack>
                    <Divider my='1rem' border='2px solid #555' />

                    <OptionsList />
                </Box>
            </Box>
        </>
    )
}

export default Dashboard
