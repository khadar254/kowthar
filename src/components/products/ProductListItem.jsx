import React from 'react'
import { Tr, Td, IconButton, useDisclosure } from '@chakra-ui/react'
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa'
import ProductEditPopup from './ProductEditPopup'
import { useProduct } from '../../contexts/ProductContext'
import DeleteDrawer from '../common/DeleteDrawer'

function ProductListItem({ product }) {
    const { deleting, deleteProduct } = useProduct()
    const { isOpen, onClose, onOpen } = useDisclosure()
    const {
        isOpen: delIsOpen,
        onClose: delClose,
        onOpen: delOpen,
    } = useDisclosure()

    return (
        <>
            <ProductEditPopup
                isOpen={isOpen}
                onClose={onClose}
                product={product}
            />
            <DeleteDrawer
                deleteFunc={deleteProduct}
                id={product?._id}
                isOpen={delIsOpen}
                onClose={delClose}
                loading={deleting}
                label={product?.name}
            />
            <Tr border='2px solid #e2e2e2'>
                <Td>{product?.name}</Td>
                <Td>{product?.price}</Td>
                <Td>{product?.quantity}</Td>
                <Td>
                    <IconButton
                        icon={<FaPencilAlt />}
                        colorScheme='cyan'
                        borderRadius='10px'
                        _focus={{ outline: 'none' }}
                        _active={{ outline: 'none' }}
                        onClick={onOpen}
                        color='#fff'
                    />
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
            </Tr>
        </>
    )
}

export default ProductListItem
