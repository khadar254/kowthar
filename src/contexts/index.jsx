import React from 'react'
import AuthProvider from './AuthContext'
import AlertProvider from './AlertsContext'

function ContextProvider({ children }) {
    return (
        <AlertProvider>
            <AuthProvider>{children}</AuthProvider>
        </AlertProvider>
    )
}

export default ContextProvider
