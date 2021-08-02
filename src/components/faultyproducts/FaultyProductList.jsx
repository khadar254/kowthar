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

const FaultyProductListItem = lazy(() =>
    import('../faultyproducts/FaultyProductListItem')
)

function FaultyProductList({ products }) {
    return (
        <Box
            as={Stack}
            direction='row'
            justifyContent='space-between'
            p='0 20px'>
            <Table flex='2' variant='striped' colorScheme='gray'>
                <TableCaption fontSize='1rem' color='#777'>
                    Faulty Products table
                </TableCaption>
                <Thead>
                    <Th fontSize='1rem'>Product Name</Th>
                    <Th fontSize='1rem'>Product id</Th>
                    <Th fontSize='1rem'>Quantity</Th>
                    <Th fontSize='1rem'>Actions</Th>
                </Thead>
                <Tbody>
                    {products &&
                        products.map((product) => (
                            <Suspense
                                key={product?._id}
                                fallback={<h1>Loading ...</h1>}>
                                <FaultyProductListItem product={product} />
                            </Suspense>
                        ))}
                </Tbody>
            </Table>
        </Box>
    )
}

export default FaultyProductList
