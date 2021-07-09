import React, { useEffect } from 'react'
import {
    Box,
    Heading,
    HStack,
    Divider,
    Button,
    IconButton,
    useDisclosure,
} from '@chakra-ui/react'
import Navbar from '../components/common/Navbar'
import { FaChevronLeft } from 'react-icons/fa'
import { useHistory } from 'react-router-dom'
import { useSales } from '../contexts/SalesContext'
import SalesOrderList from '../components/sales/SalesOrderList'
import SalesOrderPopup from '../components/sales/SalesPopup'

function Sales() {
    const history = useHistory()
    const { onClose, isOpen, onOpen } = useDisclosure()
    const { sales, fetchSales } = useSales()

    useEffect(() => {
        fetchSales()
    }, [])
    return (
        <>
            <Navbar />
            <SalesOrderPopup isOpen={isOpen} onClose={onClose} />
            <Box
                height='auto'
                minH='93vh'
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
                                borderRadius='10px'
                                color='#fff'
                                _hover={{ bg: 'cyan.700' }}
                                mr='2rem'
                            />
                            <Heading>Manage Sales</Heading>
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
                            New Sales Order
                        </Button>
                    </HStack>
                    <Divider my='1rem' border='2px solid #eee' />
                    <SalesOrderList salesOrders={sales} />
                </Box>
            </Box>
        </>
    )
}

export default Sales
