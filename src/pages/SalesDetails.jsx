import React, { useEffect } from 'react'
import {
    Box,
    Heading,
    HStack,
    Divider,
    Button,
    Text,
    VStack,
    IconButton,
    useDisclosure,
    Tooltip,
} from '@chakra-ui/react'
import Navbar from '../components/common/Navbar'
import { FaChevronLeft, FaReceipt } from 'react-icons/fa'
import { Link, useHistory, useParams } from 'react-router-dom'
import { useSales } from '../contexts/SalesContext'
import SalesDetailProductPopup from '../components/salesdetails/SalesDetailProductPopup'
import SalesDetailProductList from '../components/salesdetails/SalesDetailProductsList'
import { useAuth } from '../contexts/AuthContext'

function SalesDetails() {
    const { user } = useAuth()
    const history = useHistory()
    const params = useParams()
    const { onClose, isOpen, onOpen } = useDisclosure()
    const { sale, fetchSalesByName, calculateGrandtotal, updating } = useSales()

    useEffect(() => {
        fetchSalesByName(params.name)
    }, [])
    return (
        <>
            <Navbar />
            <SalesDetailProductPopup
                isOpen={isOpen}
                onClose={onClose}
                salesId={sale?._id}
            />
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
                    <HStack
                        width='100%'
                        justifyContent='space-between'
                        alignItems='flex-start'>
                        <HStack alignItems='flex-start'>
                            <IconButton
                                onClick={() => history.push('/sales')}
                                icon={<FaChevronLeft />}
                                bg='cyan.600'
                                borderRadius='10px'
                                color='#fff'
                                _hover={{ bg: 'cyan.700' }}
                                mr='2rem'
                            />
                            <VStack alignItems='flex-start'>
                                <Heading>Manage Sales Order</Heading>
                                <Text>{sale ? sale.name : 'loading ....'}</Text>
                            </VStack>
                        </HStack>
                        <Button
                            bg='cyan.600'
                            width='10%'
                            height='3rem'
                            isDisabled={
                                user?.username !== sale?.salesBy &&
                                user?.role !== 'admin'
                            }
                            onClick={onOpen}
                            color='#fff'
                            borderRadius='10px'
                            _focus={{ outline: 'none' }}
                            _hover={{ bg: 'cyan.600' }}>
                            Add Product
                        </Button>
                    </HStack>
                    <Divider my='1rem' border='2px solid #eee' />
                    <SalesDetailProductList sale={sale} />

                    <VStack
                        my='1rem'
                        justifyContent='flex-end'
                        alignItems='flex-end'
                        p='10px 0'
                        width='100%'>
                        <Text>Discount &bull; {sale?.discount}%</Text>
                        <Heading size='md' mx='1rem' my='1rem'>
                            Grandtotal: {sale?.grandTotal}
                        </Heading>

                        <HStack>
                            <Link
                                to={{
                                    pathname:
                                        sale?.status === 'completed'
                                            ? `/receipt/${sale?.name}`
                                            : `/sale/${sale?.name}`,
                                    state: sale,
                                }}>
                                <Tooltip
                                    label='show receipt'
                                    title='Receipt'
                                    placement='top'
                                    hasArrow>
                                    <IconButton
                                        icon={<FaReceipt />}
                                        bg='cyan.600'
                                        isDisabled={
                                            sale?.status !== 'completed'
                                        }
                                        color='#fff'
                                        height='3rem'
                                        borderRadius='10px'
                                        _focus={{ bg: 'cyan.700' }}
                                        _active={{ bg: 'cyan.700' }}
                                        _hover={{ bg: 'cyan.700' }}
                                    />
                                </Tooltip>
                            </Link>
                            <Button
                                bg='cyan.600'
                                borderRadius='10px'
                                color='#fff'
                                isDisabled={
                                    updating || sale?.status === 'completed'
                                }
                                isLoading={updating}
                                onClick={() => {
                                    calculateGrandtotal(sale?._id)
                                    location.reload()
                                }}
                                _hover={{ bg: 'cyan.700', outline: 'none' }}
                                _focus={{ bg: 'cyan.700', outline: 'none' }}
                                _active={{ bg: 'cyan.700', outline: 'none' }}
                                height='3rem'>
                                Calculate grandtotal
                            </Button>
                        </HStack>
                    </VStack>
                </Box>
            </Box>
        </>
    )
}

export default SalesDetails
