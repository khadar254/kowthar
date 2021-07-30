import React from 'react'
import { Tr, Td, IconButton, useDisclosure, Tooltip } from '@chakra-ui/react'
import { FaTrashAlt, FaReceipt, FaPencilAlt } from 'react-icons/fa'
import { useSales } from '../../contexts/SalesContext'
import DeleteDrawer from '../common/DeleteDrawer'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import SalesAddDiscount from './SalesAddDiscount'

function SalesOrderListItem({ sale }) {
    const { user } = useAuth()
    const { deleting, deleteSales } = useSales()

    const {
        isOpen: delIsOpen,
        onClose: delClose,
        onOpen: delOpen,
    } = useDisclosure()
    const { isOpen, onClose, onOpen } = useDisclosure()

    return (
        <>
            <SalesAddDiscount
                isOpen={isOpen}
                onClose={onClose}
                saleId={sale?._id}
            />
            <DeleteDrawer
                deleteFunc={deleteSales}
                id={sale?._id}
                isOpen={delIsOpen}
                onClose={delClose}
                loading={deleting}
                label={sale?.name}
            />
            <Tr border='2px solid #e2e2e2'>
                <Td>
                    <Link to={`/sale/${sale?.name}`}>{sale?.name} &rarr;</Link>
                </Td>
                <Td>KES {sale?.grandTotal}</Td>
                <Td>{sale?.status}</Td>
                <Td>{sale?.salesBy}</Td>
                <Td>
                    {user?.username === sale.salesBy ||
                    user?.role === 'admin' ? (
                        <IconButton
                            mx='0.5rem'
                            icon={<FaPencilAlt />}
                            colorScheme='cyan'
                            onClick={onOpen}
                            _focus={{ outline: 'none' }}
                            _active={{ outline: 'none' }}
                            borderRadius='10px'
                            color='#fff'
                        />
                    ) : null}

                    {user?.username === sale.salesBy ||
                    user?.role === 'admin' ? (
                        <IconButton
                            icon={<FaTrashAlt />}
                            colorScheme='red'
                            onClick={delOpen}
                            _focus={{ outline: 'none' }}
                            _active={{ outline: 'none' }}
                            borderRadius='10px'
                            color='#fff'
                        />
                    ) : null}
                </Td>
            </Tr>
        </>
    )
}

export default SalesOrderListItem
