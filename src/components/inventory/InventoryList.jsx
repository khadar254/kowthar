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

const InventoryListItem = lazy(() => import('./InventoryListItem'))

function InventoryList({ inventory }) {
    return (
        <Box as={Stack} direction='row' justifyContent='space-between'>
            <Table flex='2' variant='striped' colorScheme='gray'>
                <TableCaption fontSize='1rem' color='#777'>
                    Inventory table
                </TableCaption>
                <Thead>
                    <Th fontSize='1rem'>Product</Th>
                    <Th fontSize='1rem'>Quantity Added</Th>
                    <Th fontSize='1rem'>Added By</Th>
                    <Th fontSize='1rem'>Date Added</Th>
                </Thead>
                <Tbody>
                    {inventory &&
                        inventory.map((product) => (
                            <Suspense
                                key={product?._id}
                                fallback={<h1>Loading ...</h1>}>
                                <InventoryListItem item={product} />
                            </Suspense>
                        ))}
                </Tbody>
            </Table>
        </Box>
    )
}

export default InventoryList
