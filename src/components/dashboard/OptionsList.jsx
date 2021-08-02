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
            show: 'admin & sales',
        },
        {
            image: '/images/usermanage.svg',
            link: '/users',
            name: 'Manage Users',
            show: 'admin',
        },
        {
            image: '/images/productmanage.svg',
            link: '/products',
            name: 'Manage Products',
            show: 'admin',
        },
        {
            image: '/images/inventorymanage.svg',
            link: '/inventory',
            name: 'Manage Inventory',
            show: 'admin',
        },
        {
            image: '/images/customermanage.svg',
            link: '/customers',
            name: 'Manage Customers',
            show: 'admin & sales',
        },
        {
            image: '/images/faulty.svg',
            link: '/faultyproducts',
            name: 'Manage Faulty Products',
            show: 'admin & sales',
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
                        hidden={
                            user?.role === 'sales' && option.show === 'admin'
                        }
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

                        <Button
                            as={Link}
                            height='3rem'
                            to={{ pathname: option.link }}
                            colorScheme='cyan'
                            color='#fff'>
                            Manage
                        </Button>
                    </Box>
                ))}
            </Grid>
        </Box>
    )
}

export default OptionsList
