import React, { useEffect } from 'react'
import {
    Box,
    Heading,
    HStack,
    Divider,
    IconButton,
    Button,
    useDisclosure,
} from '@chakra-ui/react'
import Navbar from '../components/common/Navbar'
import { FaChevronLeft } from 'react-icons/fa'
import { useHistory } from 'react-router-dom'
import { useInventory } from '../contexts/InventoryContext'
import { useAuth } from '../contexts/AuthContext'
import InventoryPopup from '../components/inventory/InventoryPopup'
import InventoryList from '../components/inventory/InventoryList'
import ExportExcel from '../components/common/ExportExcel'

function Inventory() {
    const history = useHistory()
    const { isOpen, onClose, onOpen } = useDisclosure()
    const { fetchInventory, inventory } = useInventory()
    const { user } = useAuth()

    useEffect(() => {
        if (user?.role !== 'admin') {
            history.push('/dashboard')
        } else {
            fetchInventory()
        }
    }, [user?.role, history])

    const fileName = 'kowthar_hardware_inventory'
    return (
        <>
            <Navbar />
            <Box
                height='auto'
                minHeight='93vh'
                overflow='hidden'
                width='100%'
                bg='#eee'>
                <InventoryPopup onClose={onClose} isOpen={isOpen} />
                <Box
                    mx='auto'
                    width={['100%', '100%', '90%', '80%']}
                    p='30px 0'>
                    <HStack width='100%' justifyContent='space-between'>
                        <HStack>
                            <IconButton
                                onClick={() => history.push('/dashboard')}
                                icon={<FaChevronLeft />}
                                bg='cyan.600'
                                borderRadius='10px'
                                color='#fff'
                                _hover={{ bg: 'cyan.700' }}
                                mr='2rem'
                            />
                            <Heading>Manage Inventory</Heading>
                        </HStack>
                        <HStack>
                            <ExportExcel data={inventory} filename={fileName} />
                            <Button
                                bg='cyan.600'
                                width='auto'
                                minWidth='10%'
                                onClick={onOpen}
                                height='3rem'
                                color='#fff'
                                borderRadius='10px'
                                _focus={{ outline: 'none' }}
                                _hover={{ bg: 'cyan.600' }}>
                                New Inventory
                            </Button>
                        </HStack>
                    </HStack>
                    <Divider my='1rem' border='2px solid #eee' />
                    <InventoryList inventory={inventory} />
                </Box>
            </Box>
        </>
    )
}

export default Inventory
