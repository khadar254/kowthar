import React, { useEffect, useState } from 'react'
import {
    Box,
    Heading,
    HStack,
    Divider,
    Button,
    IconButton,
    useDisclosure,
    Text,
} from '@chakra-ui/react'
import Navbar from '../components/common/Navbar'
import { FaChevronLeft, FaCalendarAlt } from 'react-icons/fa'
import { useHistory } from 'react-router-dom'
import { useSales } from '../contexts/SalesContext'
import SalesOrderList from '../components/sales/SalesOrderList'
import SalesOrderPopup from '../components/sales/SalesPopup'
import DateRangePicker from '@wojtekmaj/react-daterange-picker'

function Sales() {
    const history = useHistory()
    const { onClose, isOpen, onOpen } = useDisclosure()
    const { sales, fetchSales, filterByDate } = useSales()
    const [dateValue, setDateValue] = useState(null, null)

    useEffect(() => {
        if (dateValue) {
            filterByDate(dateValue[0], dateValue[1])
        } else {
            fetchSales()
        }
    }, [dateValue])
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
                            minWidth='10%'
                            width='auto'
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
                    <HStack
                        my='2rem'
                        textAlign='center'
                        justifyContent='flex-end'>
                        <Text fontSize='1.4rem'>Filter by date:</Text>
                        <DateRangePicker
                            value={dateValue}
                            className='datepicker'
                            dayPlaceholder='10'
                            monthPlaceholder='7'
                            yearPlaceholder='2021'
                            onChange={setDateValue}
                            calendarIcon={<FaCalendarAlt />}
                        />
                    </HStack>
                    <SalesOrderList salesOrders={sales} />
                </Box>
            </Box>
        </>
    )
}

export default Sales
