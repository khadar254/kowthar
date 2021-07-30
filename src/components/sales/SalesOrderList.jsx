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

const SalesOrderListItem = lazy(() => import('../sales/SalesOrderListItem'))

function SalesOrderList({ salesOrders }) {
    return (
        <Box
            as={Stack}
            direction='row'
            justifyContent='space-between'
            p='0 20px'>
            <Table flex='2' variant='striped' colorScheme='gray'>
                <TableCaption fontSize='1rem' color='#777'>
                    Sales Orders Table
                </TableCaption>
                <Thead>
                    <Th fontSize='1rem'>Name</Th>
                    <Th fontSize='1rem'>Grand Total</Th>
                    <Th fontSize='1rem'>Status</Th>
                    <Th fontSize='1rem'>Sales By</Th>
                    <Th fontSize='1rem'>Actions</Th>
                </Thead>
                <Tbody>
                    {salesOrders &&
                        salesOrders.map((sale) => (
                            <Suspense
                                key={sale?._id}
                                fallback={<h1>Loading ...</h1>}>
                                <SalesOrderListItem sale={sale} />
                            </Suspense>
                        ))}
                </Tbody>
            </Table>
        </Box>
    )
}

export default SalesOrderList
