import React, { useEffect } from 'react'
import {
    Box,
    Heading,
    HStack,
    Divider,
    IconButton,
    Button,
    Grid,
    GridItem,
    useDisclosure,
    Table,
} from '@chakra-ui/react'
import Navbar from '../components/common/Navbar'
import { FaChevronLeft } from 'react-icons/fa'
import { useHistory } from 'react-router-dom'
import { useInventory } from '../contexts/InventoryContext'
import { useProduct } from '../contexts/ProductContext'
import { useAuth } from '../contexts/AuthContext'
import InventoryPopup from '../components/inventory/InventoryPopup'
import ProductPopup from '../components/inventory/ProductPopup'
import ProductList from '../components/inventory/ProductList'
import InventoryList from '../components/inventory/InventoryList'

function Inventory() {
    const history = useHistory()
    const { isOpen, onClose, onOpen } = useDisclosure()
    const {
        isOpen: prodIsOpen,
        onClose: prodClose,
        onOpen: toggleProd,
    } = useDisclosure()
    const { fetchInventory, inventory } = useInventory()
    const { products, fetchProducts } = useProduct()
    const { user } = useAuth()

    useEffect(() => {
        if (user?.role !== 'admin') {
            history.push('/dashboard')
        } else {
            fetchProducts()
            fetchInventory()
        }
    }, [user?.role, history])
    return (
        <>
            <Navbar />
            <Box height='93vh' overflow='hidden' width='100%' bg='#eee'>
                <InventoryPopup onClose={onClose} isOpen={isOpen} />
                <ProductPopup onClose={prodClose} isOpen={prodIsOpen} />
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
                                _hover={{ bg: 'cyan.700' }}
                                mr='2rem'
                            />
                            <Heading>Manage Inventory</Heading>
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
                            New Inventory
                        </Button>
                    </HStack>
                    <Divider my='1rem' border='2px solid #eee' />

                    <Grid gap='2rem' templateColumns='repeat(3,1fr)'>
                        <GridItem colSpan={2}>
                            <Heading size='md'>Inventory</Heading>
                            <Divider my='1rem' border='2px solid #eee' />
                            <InventoryList inventory={inventory} />
                        </GridItem>
                        <Box>
                            <HStack
                                width='100%'
                                alignItems='center'
                                justifyContent='space-between'>
                                <Heading size='md'>Products</Heading>
                                <Button
                                    colorScheme='cyan'
                                    color='#fff'
                                    onClick={toggleProd}>
                                    Add Product
                                </Button>
                            </HStack>
                            <Divider my='1rem' border='2px solid #eee' />
                            <ProductList products={products} />
                        </Box>
                    </Grid>
                </Box>
            </Box>
        </>
    )
}

export default Inventory
