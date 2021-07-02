import React from 'react'
import { Tr, Td } from '@chakra-ui/react'

function InventoryListItem({ item }) {
    return (
        <Tr>
            <Td>{item?.productId}</Td>
            <Td>{item?.quantityAdded}</Td>
            <Td>{item?.userName}</Td>
            <Td>{new Date(item?.created).toLocaleString()}</Td>
        </Tr>
    )
}

export default InventoryListItem
