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
import { useFaultyProduct } from '../contexts/FaultyContext'
import FaultyProductPopup from '../components/faultyproducts/FaultyProductPopup'
import FaultyProductList from '../components/faultyproducts/FaultyProductList'
import { useAuth } from '../contexts/AuthContext'

function FaultyProducts() {
    const history = useHistory()
    const { user } = useAuth()
    const { isOpen, onClose, onOpen } = useDisclosure()
    const { products, fetchFaultyProducts } = useFaultyProduct()

    useEffect(() => {
        fetchFaultyProducts()
    }, [])
    return (
        <>
            <Navbar />
            <Box
                height='auto'
                minHeight='93vh'
                overflow='hidden'
                width='100%'
                bg='#eee'>
                <FaultyProductPopup onClose={onClose} isOpen={isOpen} />
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
                            <Heading>Manage Faulty Products</Heading>
                        </HStack>

                        <Button
                            bg='cyan.600'
                            width='auto'
                            height='3rem'
                            onClick={onOpen}
                            isDisabled={user?.role !== 'admin'}
                            hidden={user?.role !== 'admin' && 'hidden'}
                            color='#fff'
                            borderRadius='10px'
                            _focus={{ outline: 'none' }}
                            _hover={{ bg: 'cyan.600' }}>
                            Add Faulty Product
                        </Button>
                    </HStack>
                    <Divider my='1rem' border='2px solid #eee' />
                    <FaultyProductList products={products} />
                </Box>
            </Box>
        </>
    )
}

export default FaultyProducts
