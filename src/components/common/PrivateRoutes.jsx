import React from 'react'
import { Route, Redirect } from 'react-router-dom'

function PrivateRoutes({ component: Component, ...rest }) {
    const isAuthenticated = !!localStorage.getItem('auth-token')
    return (
        <Route
            {...rest}
            component={(componentProps) =>
                isAuthenticated ? (
                    <>
                        <Component {...componentProps} />
                    </>
                ) : (
                    <Redirect to={{ pathname: '/' }} />
                )
            }
        />
    )
}

export default PrivateRoutes
