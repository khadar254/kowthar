import React from 'react'
import {
    Box,
    Divider,
    Heading,
    Text,
    VStack,
    Table,
    Thead,
    Th,
    Tr,
    Td,
    TableCaption,
    Tbody,
} from '@chakra-ui/react'

function ReceiptItems({ sale, refr }) {
    return (
        <>
            <Box width='100%' ref={refr} p='20px'>
                <Heading>Kowthar Hardware</Heading>
                <Text my='0.5rem'>Sales order &bull; {sale?.name}</Text>
                <VStack my='1rem' alignItems='flex-start'>
                    <Text>Customer : {sale?.customer?.name}</Text>
                    <Text>Contact : {sale?.customer?.number}</Text>
                </VStack>
                <Divider my='1rem' />
                <Box>
                    <Heading size='md' my='1rem'>
                        Products
                    </Heading>
                    <Table variant='striped' colorScheme='gray'>
                        <TableCaption>Sales order products</TableCaption>
                        <Thead>
                            <Th fontSize='1rem'>Name</Th>
                            <Th fontSize='1rem'>Price (KES)</Th>
                            <Th fontSize='1rem'>Quantity</Th>
                            <Th fontSize='1rem'>Subtotal (KES)</Th>
                        </Thead>
                        <Tbody>
                            {sale?.products.map((prod) => (
                                <Tr key={prod?.name} border='2px solid #e2e2e2'>
                                    <Td>{prod.name}</Td>
                                    <Td>{prod.productPrice}</Td>
                                    <Td>{prod.quantity}</Td>
                                    <Td>{prod.quantity * prod.productPrice}</Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </Box>
                <VStack my='2rem' alignItems='flex-end'>
                    <Text>Sales by : {sale?.salesBy}</Text>
                    <Text>
                        Order Date &bull;{' '}
                        {new Date(sale?.created).toLocaleDateString()}
                    </Text>
                    <Text>Discount applied &bull; {sale?.discount}%</Text>
                    <Divider my='1rem' />
                    <Heading my='1rem'>
                        Grandtotal &bull; KES {sale?.grandTotal}
                    </Heading>
                </VStack>
                <VStack mt='5rem' color='#555'>
                    <Heading size='lg'>Please come again</Heading>
                    <Heading size='md'>Thank you</Heading>
                    <Text>
                        {new Date().getFullYear()} &copy; Kowthar Hardware
                    </Text>
                </VStack>
            </Box>
        </>
    )
}

export default ReceiptItems
