import React, { lazy, Suspense } from 'react'
import {
    Box,
    Table,
    Thead,
    Th,
    Tbody,
    TableCaption,
    Stack,
} from '@chakra-ui/react'

const CustomerListItem = lazy(() => import('../customers/CustomerListItem'))

function CustomerList({ customers }) {
    return (
        <Box
            as={Stack}
            direction='row'
            justifyContent='space-between'
            p='0 20px'>
            <Table flex='2' variant='striped' colorScheme='gray'>
                <TableCaption fontSize='1rem' color='#777'>
                    Customers table
                </TableCaption>
                <Thead>
                    <Th fontSize='1rem'>Name</Th>
                    <Th fontSize='1rem'>Number</Th>
                    <Th fontSize='1rem'>Transactions</Th>
                    <Th fontSize='1rem'>Actions</Th>
                </Thead>
                <Tbody>
                    {customers &&
                        customers.map((customer) => (
                            <Suspense
                                key={customer?._id}
                                fallback={<h1>Loading ...</h1>}>
                                <CustomerListItem customer={customer} />
                            </Suspense>
                        ))}
                </Tbody>
            </Table>
        </Box>
    )
}

export default CustomerList
