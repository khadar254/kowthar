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
import { useHistory, useParams } from 'react-router-dom'
import { useSales } from '../contexts/SalesContext'
import SalesDetailProductPopup from '../components/salesdetails/SalesDetailProductPopup'

function SalesDetails() {
    const history = useHistory()
    const params = useParams()
    const { onClose, isOpen, onOpen } = useDisclosure()
    const { sale, fetchSalesByName } = useSales()

    useEffect(() => {
        fetchSalesByName(params.name)
    }, [])
    return (
        <>
            <Navbar />
            <SalesDetailProductPopup isOpen={isOpen} onClose={onClose} />
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
                                onClick={() => history.push('/sales')}
                                icon={<FaChevronLeft />}
                                bg='cyan.600'
                                borderRadius='10px'
                                color='#fff'
                                _hover={{ bg: 'cyan.700' }}
                                mr='2rem'
                            />
                            <Heading>
                                Manage {sale ? sale.name : 'loading ....'}
                            </Heading>
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
                            Add Product
                        </Button>
                    </HStack>
                    <Divider my='1rem' border='2px solid #eee' />
                    <Heading size='2xl' mt='5rem' textAlign='center'>
                        Work in progress!!
                    </Heading>
                </Box>
            </Box>
        </>
    )
}

export default SalesDetails
