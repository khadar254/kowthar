import React from 'react'
import AuthProvider from './AuthContext'
import AlertProvider from './AlertsContext'
import ProductProvider from './ProductContext'
import InventoryProvider from './InventoryContext'

function ContextProvider({ children }) {
    return (
        <AlertProvider>
            <AuthProvider>
                <ProductProvider>
                    <InventoryProvider>{children}</InventoryProvider>
                </ProductProvider>
            </AuthProvider>
        </AlertProvider>
    )
}

export default ContextProvider
