import React, { useEffect } from 'react'
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
import { useProduct } from '../contexts/ProductContext'
import { useAuth } from '../contexts/AuthContext'
import ProductPopup from '../components/inventory/ProductPopup'
import ProductList from '../components/inventory/ProductList'

function Product() {
    const history = useHistory()
    const { isOpen, onClose, onOpen } = useDisclosure()
    const { products, fetchProducts } = useProduct()
    const { user } = useAuth()

    useEffect(() => {
        if (user?.role !== 'admin') {
            history.push('/dashboard')
        } else {
            fetchProducts()
        }
    }, [user?.role, history])
    return (
        <>
            <Navbar />
            <Box height='93vh' overflow='hidden' width='100%' bg='#eee'>
                <ProductPopup onClose={onClose} isOpen={isOpen} />
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
                                borderRadius='10px'
                                color='#fff'
                                _hover={{ bg: 'cyan.700' }}
                                mr='2rem'
                            />
                            <Heading>Manage Products</Heading>
                        </HStack>
                        <Button
                            bg='cyan.600'
                            width='10%'
                            height='3rem'
                            onClick={onOpen}
                            color='#fff'
                            borderRadius='10px'
                            _focus={{ outline: 'none' }}
                            _hover={{ bg: 'cyan.600' }}>
                            New Product
                        </Button>
                    </HStack>
                    <Divider my='1rem' border='2px solid #eee' />
                    <ProductList products={products} />
                </Box>
            </Box>
        </>
    )
}

export default Product
