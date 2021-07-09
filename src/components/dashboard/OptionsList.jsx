import React from 'react'
import { Link } from 'react-router-dom'
import { Box, Image, Grid, Heading, Stack, Button } from '@chakra-ui/react'
import { useAuth } from '../../contexts/AuthContext'

function OptionsList() {
    const { user } = useAuth()
    const options = [
        {
            image: '/images/salesmanage.svg',
            link: '/sales',
            name: 'Manage Sales',
        },
        {
            image: '/images/usermanage.svg',
            link: '/users',
            name: 'Manage Users',
        },
        {
            image: '/images/productmanage.svg',
            link: '/products',
            name: 'Manage Products',
        },
        {
            image: '/images/inventorymanage.svg',
            link: '/inventory',
            name: 'Manage Inventory',
        },
        {
            image: '/images/customermanage.svg',
            link: '/customers',
            name: 'Manage Customers',
        },
    ]
    return (
        <Box mt='2rem' p='20px 0' width='100%' height='auto'>
            <Grid
                gap='1rem'
                templateColumns={[
                    'repeat(1, 1fr)',
                    'repeat(2, 1fr)',
                    'repeat(2, 1fr)',
                    'repeat(3, 1fr)',
                ]}>
                {options.map((option, index) => (
                    <Box
                        key={index}
                        as={Stack}
                        bg='#fff'
                        alignItems='center'
                        justifyContent='space-between'
                        height='30vh'
                        shadow='md'
                        p='20px 10px'
                        borderRadius='20px'
                        width='100%'>
                        <Image
                            src={option.image}
                            alt='manage users'
                            objectFit='contain'
                            width='100%'
                            height='12vh'
                        />
                        <Heading
                            as={Link}
                            size='md'
                            to={{ pathname: option.link }}>
                            {option.name}
                        </Heading>

                        {user?.role === 'admin' ? (
                            <Button
                                as={Link}
                                height='3rem'
                                to={{ pathname: option.link }}
                                colorScheme='cyan'
                                color='#fff'>
                                Manage
                            </Button>
                        ) : user?.role === 'sales' &&
                          option.name === 'Manage Sales' ? (
                            <Button
                                as={Link}
                                height='3rem'
                                to={{ pathname: option.link }}
                                colorScheme='cyan'
                                color='#fff'>
                                Manage
                            </Button>
                        ) : (
                            <Button
                                height='3rem'
                                bg='transparent'
                                color='#fff'
                                visibility='hidden'
                            />
                        )}
                    </Box>
                ))}
            </Grid>
        </Box>
    )
}

export default OptionsList
