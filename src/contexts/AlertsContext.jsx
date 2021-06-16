import * as types from './types'
import React, { useContext, createContext, useReducer, useEffect } from 'react'
import { AlertReducer } from './reducers/AlertReducer'
import { useToast } from '@chakra-ui/react'

const AlertContext = createContext({})

const initialState = {
    message: null,
    error: null,
}

function AlertProvider({ children }) {
    const toast = useToast()
    const [state, dispatch] = useReducer(AlertReducer, initialState)

    function setMessage(message) {
        dispatch({
            type: types.SET_MESSAGE,
            payload: message,
        })
    }

    function setError(error) {
        dispatch({
            type: types.SET_ERROR,
            payload: error,
        })
    }

    function clearAlerts() {
        dispatch({
            type: types.CLEAR_ALERTS,
        })
    }

    useEffect(() => {
        if (state.message) {
            toast({
                title: 'Message alert',
                status: 'success',
                description: state.message,
                duration: 4000,
                isClosable: true,
                position: 'top',
            })
        }
        if (state.error) {
            toast({
                title: 'Error alert',
                status: 'error',
                description: state.error,
                duration: 4000,
                isClosable: true,
                position: 'top',
            })
        }

        clearAlerts()
    }, [state.error, state.message, toast])

    const value = {
        ...state,
        setMessage,
        setError,
    }

    return (
        <AlertContext.Provider value={value}>{children}</AlertContext.Provider>
    )
}

export const useAlert = () => useContext(AlertContext)

export default AlertProvider
