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

const ProductListItem = lazy(() => import('../products/ProductListItem'))

function ProductList({ products }) {
    return (
        <Box
            as={Stack}
            direction='row'
            justifyContent='space-between'
            p='0 20px'>
            <Table flex='2' variant='striped'>
                <TableCaption fontSize='1rem' color='#777'>
                    Products table
                </TableCaption>
                <Thead>
                    <Th fontSize='1rem'>Name</Th>
                    <Th fontSize='1rem'>Price (KES)</Th>
                    <Th fontSize='1rem'>Quantity</Th>
                    <Th fontSize='1rem'>Actions</Th>
                </Thead>
                <Tbody>
                    {products &&
                        products.map((product) => (
                            <Suspense
                                key={product?._id}
                                fallback={<h1>Loading ...</h1>}>
                                <ProductListItem product={product} />
                            </Suspense>
                        ))}
                </Tbody>
            </Table>
        </Box>
    )
}

export default ProductList
