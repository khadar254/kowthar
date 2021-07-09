import React, {
    createContext,
    useContext,
    useReducer,
    useCallback,
} from 'react'
import * as types from './types'
import { CustomerReducer } from './reducers/CustomerReducer'
import axios from 'axios'
import { config } from '../utils/axiosConfig'
import { useAlert } from './AlertsContext'

const CustomerContext = createContext({})

const initialState = {
    customers: [],
    fetching: false,
    updating: false,
    deleting: false,
}

function CustomerProvider({ children }) {
    const [state, dispatch] = useReducer(CustomerReducer, initialState)

    const { setMessage, setError } = useAlert()

    const fetchCustomers = useCallback(async () => {
        try {
            dispatch({
                type: types.FETCH_CUSTOMERS_REQUEST,
            })

            const { data } = await axios.get('/api/customers', config())

            dispatch({
                type: types.FETCH_CUSTOMERS_SUCCESS,
                payload: data,
            })
        } catch (error) {
            dispatch({ type: types.FETCH_CUSTOMERS_FAIL })
        }
    }, [])

    async function updateCustomer(id, update) {
        try {
            dispatch({
                type: types.UPDATE_CUSTOMER_REQUEST,
            })

            const { data } = await axios.put(
                `/api/customers/${id}`,
                update,
                config()
            )

            dispatch({
                type: types.UPDATE_CUSTOMER_SUCCESS,
                payload: data,
            })

            setMessage(data.message)
        } catch (error) {
            dispatch({ type: types.UPDATE_CUSTOMER_FAIL })
            // show error
            setError(error?.response.data.message)
        }
    }
    async function deleteCustomer(id) {
        try {
            dispatch({
                type: types.DELETE_CUSTOMER_REQUEST,
            })

            const { data } = await axios.delete(
                `/api/customers/${id}`,
                config()
            )

            dispatch({
                type: types.DELETE_CUSTOMER_SUCCESS,
                payload: id,
            })

            setMessage(data.message)
        } catch (error) {
            const { data } = error.response
            dispatch({ type: types.DELETE_CUSTOMER_FAIL })
            // show error
            setError(data.message)
        }
    }

    const value = {
        ...state,
        fetchCustomers,
        updateCustomer,
        deleteCustomer,
    }
    return (
        <CustomerContext.Provider value={value}>
            {children}
        </CustomerContext.Provider>
    )
}

export const useCustomer = () => useContext(CustomerContext)

export default CustomerProvider
