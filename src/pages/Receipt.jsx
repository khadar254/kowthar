import React, { useEffect } from 'react'
import {
    Box,
    Heading,
    HStack,
    Divider,
    Button,
    IconButton,
    useToast,
} from '@chakra-ui/react'
import Navbar from '../components/common/Navbar'
import { useHistory, useParams, useLocation } from 'react-router-dom'
import { FaChevronLeft } from 'react-icons/fa'
import ReactToPdf from 'react-to-pdf'
import { useSales } from '../contexts/SalesContext'
import ReceiptItems from '../components/receipt/ReceiptItems'

function SalesReceipt() {
    const toast = useToast()
    const history = useHistory()
    const { state = {} } = useLocation()

    const params = useParams()
    const { fetchSalesByName, sale } = useSales()

    useEffect(() => {
        fetchSalesByName(params.name)
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
                <ReactToPdf
                    filename={`Kowthar_salesorder_${sale?.name || state?.name}`}
                    scale={0.7}
                    onComplete={() => {
                        toast({
                            status: 'success',
                            title: 'Action successful',
                            description: 'Receipt has been downloaded!',
                            duration: 4000,
                            isClosable: true,
                            position: 'top',
                        })
                    }}>
                    {({ toPdf, targetRef }) => (
                        <Box width='60%' mx='auto' p='20px' height='100%'>
                            <HStack width='100%' justifyContent='space-between'>
                                <HStack>
                                    <IconButton
                                        onClick={() =>
                                            history.goBack() ||
                                            history.push('/dashboard')
                                        }
                                        icon={<FaChevronLeft />}
                                        bg='cyan.600'
                                        borderRadius='10px'
                                        color='#fff'
                                        _hover={{ bg: 'cyan.700' }}
                                        mr='2rem'
                                    />
                                    <Heading>Receipt</Heading>
                                </HStack>
                                <Button
                                    bg='cyan.600'
                                    width='auto'
                                    height='3rem'
                                    onClick={toPdf}
                                    color='#fff'
                                    borderRadius='10px'
                                    _focus={{ outline: 'none' }}
                                    _hover={{ bg: 'cyan.600' }}>
                                    Download Receipt
                                </Button>
                            </HStack>
                            <Divider my='1rem' />
                            <ReceiptItems
                                sale={sale || state}
                                refr={targetRef}
                            />
                        </Box>
                    )}
                </ReactToPdf>
            </Box>
        </>
    )
}

export default SalesReceipt
