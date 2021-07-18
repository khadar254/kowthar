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

const SalesDetailProductListItem = lazy(() =>
    import('./SalesDetailProductListItem')
)

function SalesDetailProductsList({ sale }) {
    return (
        <Box
            as={Stack}
            direction='row'
            justifyContent='space-between'
            p='0 20px'>
            <Table flex='2' variant='striped'>
                <TableCaption fontSize='1rem' color='#777'>
                    Sales Products table
                </TableCaption>
                <Thead>
                    <Th fontSize='1rem'>Name</Th>
                    <Th fontSize='1rem'>Price (KES)</Th>
                    <Th fontSize='1rem'>Quantity</Th>
                    <Th fontSize='1rem'>subtotal</Th>
                    <Th fontSize='1rem'>Actions</Th>
                </Thead>
                <Tbody>
                    {sale?.products &&
                        sale?.products.map((product) => (
                            <Suspense
                                key={product?.name}
                                fallback={<h1>Loading ...</h1>}>
                                <SalesDetailProductListItem
                                    item={product}
                                    saleId={sale?._id}
                                />
                            </Suspense>
                        ))}
                </Tbody>
            </Table>
        </Box>
    )
}

export default SalesDetailProductsList
