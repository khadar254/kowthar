import React from 'react'
import DrawerMenu from './DrawerMenu'
import { Alert, AlertIcon, Box, Button, HStack } from '@chakra-ui/react'

function DeleteDrawer({ isOpen, onClose, label, deleteFunc, id, loading }) {
    return (
        <DrawerMenu
            size='sm'
            onClose={onClose}
            isOpen={isOpen}
            label={`Delete ${label}`}>
            <Box my='1rem'>
                <Alert
                    variant='subtle'
                    status='warning'
                    height='10vh'
                    borderRadius='10px'>
                    <AlertIcon />
                    Are you sure you want to proceed?
                </Alert>
            </Box>
            <HStack
                my='2rem'
                width='100%'
                alignItems='center'
                justifyContent='space-between'>
                <Button
                    colorScheme='gray'
                    height='3rem'
                    width='40%'
                    borderRadius='10px'
                    onClick={onClose}>
                    Cancel
                </Button>
                <Button
                    colorScheme='red'
                    height='3rem'
                    borderRadius='10px'
                    width='40%'
                    isDisabled={loading}
                    isLoading={loading}
                    onClick={() => {
                        deleteFunc(id)
                    }}>
                    Delete
                </Button>
            </HStack>
        </DrawerMenu>
    )
}

export default DeleteDrawer
