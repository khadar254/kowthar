import React from 'react'
import { Tr, Td, IconButton, useDisclosure } from '@chakra-ui/react'
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa'
import DeleteDrawer from '../common/DeleteDrawer'
import { useCustomer } from '../../contexts/CustomerContext'
import CustomerEditPopup from './CustomerEditPopup'

function CustomerListItem({ customer }) {
    const { deleting, deleteCustomer } = useCustomer()
    const { isOpen, onClose, onOpen } = useDisclosure()
    const {
        isOpen: delIsOpen,
        onClose: delClose,
        onOpen: delOpen,
    } = useDisclosure()

    return (
        <>
            <CustomerEditPopup
                isOpen={isOpen}
                onClose={onClose}
                customer={customer}
            />
            <DeleteDrawer
                deleteFunc={deleteCustomer}
                id={customer?._id}
                isOpen={delIsOpen}
                onClose={delClose}
                loading={deleting}
                label={customer?.name}
            />
            <Tr>
                <Td>{customer?.name}</Td>
                <Td>{customer?.number}</Td>
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

export default CustomerListItem
