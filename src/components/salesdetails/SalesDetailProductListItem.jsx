import React from 'react'
import { Tr, Td, IconButton, useDisclosure } from '@chakra-ui/react'
import { FaTrashAlt, FaPencilAlt } from 'react-icons/fa'
import { useSales } from '../../contexts/SalesContext'
import DeleteDrawer from '../common/DeleteDrawer'
import { useHistory } from 'react-router-dom'
import SalesProductEditPopup from '../sales/SalesProductEditPopup'

function SalesDetailProductListItem({ item, saleId }) {
    const history = useHistory()
    const { updating, deleteProductToOrder } = useSales()
    const {
        isOpen: delIsOpen,
        onClose: delClose,
        onOpen: delOpen,
    } = useDisclosure()
    const { isOpen, onClose, onOpen } = useDisclosure()

    function deleteSalesProduct(id) {
        deleteProductToOrder(id, item?.name)
        history.go(0)
    }

    return (
        <>
            <SalesProductEditPopup
                product={item}
                salesId={saleId}
                onClose={onClose}
                isOpen={isOpen}
            />
            <DeleteDrawer
                deleteFunc={deleteSalesProduct}
                id={saleId}
                isOpen={delIsOpen}
                onClose={delClose}
                loading={updating}
                label={item?.name}
            />
            <Tr>
                <Td>{item?.name}</Td>
                <Td>KES {item?.productPrice}</Td>
                <Td>{item?.quantity}</Td>
                <Td>{item?.quantity * item?.productPrice}</Td>
                <Td>
                    <IconButton
                        icon={<FaPencilAlt />}
                        colorScheme='cyan'
                        borderRadius='10px'
                        onClick={onOpen}
                        _focus={{ outline: 'none' }}
                        _active={{ outline: 'none' }}
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

export default SalesDetailProductListItem
