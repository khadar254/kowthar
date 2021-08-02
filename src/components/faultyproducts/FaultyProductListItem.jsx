import React from 'react'
import { Tr, Td, IconButton, useDisclosure } from '@chakra-ui/react'
import { FaTrashAlt } from 'react-icons/fa'
import { useFaultyProduct } from '../../contexts/FaultyContext'
import DeleteDrawer from '../common/DeleteDrawer'
import { useAuth } from '../../contexts/AuthContext'

function FaultyProductListItem({ product }) {
    const { deleting, deleteFaultyProduct } = useFaultyProduct()
    const { user } = useAuth()
    const {
        isOpen: delIsOpen,
        onClose: delClose,
        onOpen: delOpen,
    } = useDisclosure()

    return (
        <>
            <DeleteDrawer
                deleteFunc={deleteFaultyProduct}
                id={product?._id}
                isOpen={delIsOpen}
                onClose={delClose}
                loading={deleting}
                label={product?.name}
            />
            <Tr border='2px solid #e2e2e2'>
                <Td>{product?.productName}</Td>
                <Td>{product?.productId}</Td>
                <Td>{product?.quantity}</Td>
                {user?.role === 'admin' && (
                    <Td>
                        <IconButton
                            mx='1rem'
                            icon={<FaTrashAlt />}
                            colorScheme='red'
                            onClick={delOpen}
                            _focus={{ outline: 'none' }}
                            _active={{ outline: 'none' }}
                            borderRadius='10px'
                            color='#fff'
                        />
                    </Td>
                )}
            </Tr>
        </>
    )
}

export default FaultyProductListItem
