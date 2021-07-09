import React, { useEffect } from 'react'
import { Box, Heading, HStack, Divider, IconButton } from '@chakra-ui/react'
import Navbar from '../components/common/Navbar'
import { FaChevronLeft } from 'react-icons/fa'
import { useHistory } from 'react-router-dom'
import { useCustomer } from '../contexts/CustomerContext'
import CustomerList from '../components/customers/CustomerList'

function Customers() {
    const history = useHistory()
    const { customers, fetchCustomers } = useCustomer()

    useEffect(() => {
        fetchCustomers()
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
                            <Heading>Manage Customers</Heading>
                        </HStack>
                    </HStack>
                    <Divider my='1rem' border='2px solid #eee' />
                    <CustomerList customers={customers} />
                </Box>
            </Box>
        </>
    )
}

export default Customers
