import React from 'react'
import { Tr, Td } from '@chakra-ui/react'

function ProductListItem({ product }) {
    return (
        <Tr>
            <Td>{product?.name}</Td>
            <Td>{product?.price}</Td>
            <Td>{product?.quantity}</Td>
        </Tr>
    )
}

export default ProductListItem
