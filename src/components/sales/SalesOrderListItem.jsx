import React from 'react'
import { Tr, Td, IconButton, useDisclosure, Tooltip } from '@chakra-ui/react'
import { FaTrashAlt, FaReceipt } from 'react-icons/fa'
import { useSales } from '../../contexts/SalesContext'
import DeleteDrawer from '../common/DeleteDrawer'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

function SalesOrderListItem({ sale }) {
    const { user } = useAuth()
    const { deleting, deleteSales } = useSales()

    const {
        isOpen: delIsOpen,
        onClose: delClose,
        onOpen: delOpen,
    } = useDisclosure()

    return (
        <>
            <DeleteDrawer
                deleteFunc={deleteSales}
                id={sale?._id}
                isOpen={delIsOpen}
                onClose={delClose}
                loading={deleting}
                label={sale?.name}
            />
            <Tr>
                <Td>
                    <Link to={`/sale/${sale?.name}`}>{sale?.name} &rarr;</Link>
                </Td>
                <Td>KES {sale?.grandTotal}</Td>
                <Td>{sale?.status}</Td>
                <Td>{sale?.salesBy}</Td>
                <Td>
                    <Tooltip
                        hasArrow
                        position='top'
                        borderRadius='3px'
                        label='View receipt'>
                        <IconButton
                            icon={<FaReceipt />}
                            colorScheme='cyan'
                            borderRadius='10px'
                            isDisabled={
                                sale?.status === 'new' ||
                                sale?.status === 'in progress'
                            }
                            _focus={{ outline: 'none' }}
                            _active={{ outline: 'none' }}
                            color='#fff'
                        />
                    </Tooltip>

                    {user?.username === sale.salesBy ||
                    user?.role === 'admin' ? (
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
                    ) : null}
                </Td>
            </Tr>
        </>
    )
}

export default SalesOrderListItem
