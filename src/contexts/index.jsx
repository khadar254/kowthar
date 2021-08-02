import React from 'react'
import AuthProvider from './AuthContext'
import AlertProvider from './AlertsContext'
import ProductProvider from './ProductContext'
import FaultyProductProvider from './FaultyContext'
import InventoryProvider from './InventoryContext'
import CustomerProvider from './CustomerContext'
import SalesProvider from './SalesContext'

function ContextProvider({ children }) {
    return (
        <AlertProvider>
            <AuthProvider>
                <ProductProvider>
                    <FaultyProductProvider>
                        <InventoryProvider>
                            <SalesProvider>
                                <CustomerProvider>{children}</CustomerProvider>
                            </SalesProvider>
                        </InventoryProvider>
                    </FaultyProductProvider>
                </ProductProvider>
            </AuthProvider>
        </AlertProvider>
    )
}

export default ContextProvider
