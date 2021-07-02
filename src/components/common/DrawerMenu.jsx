import React from 'react'
import {
    Drawer,
    DrawerOverlay,
    DrawerCloseButton,
    DrawerContent,
    DrawerBody,
    DrawerHeader,
} from '@chakra-ui/react'

function DrawerMenu({ size = 'xl', onClose, isOpen, header, children }) {
    return (
        <Drawer size={size} placement='right' onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay />
            <DrawerContent p='100px 20px'>
                <DrawerCloseButton fontSize='1.2rem' />
                <DrawerHeader fontSize='1.5rem'>{header}</DrawerHeader>
                <DrawerBody>{children}</DrawerBody>
            </DrawerContent>
        </Drawer>
    )
}

export default DrawerMenu