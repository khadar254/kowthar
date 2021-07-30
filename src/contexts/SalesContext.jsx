import React, {
    createContext,
    useContext,
    useReducer,
    useCallback,
} from 'react'
import * as types from './types'
import { SalesReducer } from './reducers/SalesReducer'
import axios from 'axios'
import { config } from '../utils/axiosConfig'
import { useAlert } from './AlertsContext'

const SalesContext = createContext({})

const initialState = {
    sales: [],
    sale: {},
    creating: false,
    fetching: false,
    updating: false,
    deleting: false,
}

function SalesProvider({ children }) {
    const [state, dispatch] = useReducer(SalesReducer, initialState)
    const { setMessage, setError } = useAlert()

    async function createSales(salesOrder) {
        try {
            dispatch({
                type: types.CREATE_SALES_REQUEST,
            })
            const { data } = await axios.post(
                '/api/sales',
                salesOrder,
                config()
            )

            dispatch({
                type: types.CREATE_SALES_SUCCESS,
                payload: data,
            })

            setMessage(data.message)
        } catch (error) {
            const { data } = error.response
            dispatch({ type: types.CREATE_SALES_FAIL })
            // show Error
            setError(data.message)
        }
    }

    const fetchSales = useCallback(async () => {
        try {
            dispatch({
                type: types.FETCH_SALES_REQUEST,
            })

            const { data } = await axios.get('/api/sales', config())

            dispatch({
                type: types.FETCH_SALES_SUCCESS,
                payload: data,
            })
        } catch (error) {
            dispatch({ type: types.FETCH_SALES_FAIL })
        }
    }, [])

    const fetchSalesByName = useCallback(async (name) => {
        try {
            dispatch({
                type: types.FETCH_SALES_BY_NAME_REQUEST,
            })

            const { data } = await axios.get(
                `/api/sales/sale/${name}`,
                config()
            )

            dispatch({
                type: types.FETCH_SALES_BY_NAME_SUCCESS,
                payload: data,
            })
        } catch (error) {
            dispatch({ type: types.FETCH_SALES_BY_NAME_FAIL })
        }
    }, [])

    async function updateSales(id, update) {
        try {
            dispatch({
                type: types.UPDATE_SALES_REQUEST,
            })

            const { data } = await axios.put(
                `/api/sales/${id}`,
                update,
                config()
            )

            dispatch({
                type: types.UPDATE_SALES_SUCCESS,
                payload: data,
            })

            setMessage(data.message)
        } catch (error) {
            dispatch({ type: types.UPDATE_SALES_FAIL })
            // show error
            setError(error?.response.data.message)
        }
    }

    async function addProductToOrder(id, product) {
        try {
            dispatch({
                type: types.UPDATE_SALES_REQUEST,
            })

            const { data } = await axios.put(
                `/api/sales/addproduct/${id}`,
                product,
                config()
            )

            dispatch({
                type: types.UPDATE_SALES_SUCCESS,
                payload: data,
            })

            setMessage(data.message)
        } catch (error) {
            dispatch({ type: types.UPDATE_SALES_FAIL })
            setError(error?.response.data.message)
        }
    }

    async function updateProductToOrder(id, name, update) {
        try {
            dispatch({
                type: types.UPDATE_SALES_REQUEST,
            })

            const { data } = await axios.put(
                `/api/sales/updateproduct/${id}/${name}`,
                update,
                config()
            )

            dispatch({
                type: types.UPDATE_SALES_SUCCESS,
                payload: data,
            })

            setMessage(data.message)
        } catch (error) {
            dispatch({ type: types.UPDATE_SALES_FAIL })

            setError(error?.response.data.message)
        }
    }

    async function deleteProductToOrder(id, name) {
        try {
            dispatch({
                type: types.UPDATE_SALES_REQUEST,
            })

            const { data } = await axios.put(
                `/api/sales/deleteproduct/${id}/${name}`,
                {},
                config()
            )

            dispatch({
                type: types.UPDATE_SALES_SUCCESS,
                payload: data,
            })

            setMessage(data.message)
        } catch (error) {
            dispatch({ type: types.UPDATE_SALES_FAIL })
            setError(error?.response.data.message)
        }
    }

    async function deleteSales(id) {
        try {
            dispatch({
                type: types.DELETE_SALES_REQUEST,
            })

            const { data } = await axios.delete(`/api/sales/${id}`, config())

            dispatch({
                type: types.DELETE_SALES_SUCCESS,
                payload: id,
            })
            setMessage(data.message)
        } catch (error) {
            const { data } = error.response
            dispatch({ type: types.DELETE_SALES_FAIL })
            // show error
            setError(data.message)
        }
    }
    async function calculateGrandtotal(id) {
        try {
            dispatch({
                type: types.UPDATE_SALES_REQUEST,
            })

            const { data } = await axios.put(
                `/api/sales/completesale/${id}`,
                {},
                config()
            )

            dispatch({
                type: types.UPDATE_SALES_SUCCESS,
                payload: data,
            })

            setMessage(data.message)
        } catch (error) {
            dispatch({ type: types.UPDATE_SALES_FAIL })
            // show error
            setError(error?.response.data.message)
        }
    }

    const filterByDate = async (from, to) => {
        try {
            dispatch({
                type: types.FETCH_SALES_REQUEST,
            })

            const { data } = await axios.get(
                `/api/sales/bydate/${from}/${to}`,
                config()
            )

            dispatch({
                type: types.FETCH_SALES_SUCCESS,
                payload: data,
            })
        } catch (error) {
            dispatch({ type: types.FETCH_SALES_FAIL })
        }
    }

    const value = {
        ...state,
        createSales,
        fetchSales,
        updateSales,
        deleteSales,
        fetchSalesByName,
        addProductToOrder,
        updateProductToOrder,
        deleteProductToOrder,
        calculateGrandtotal,
        filterByDate,
    }
    return (
        <SalesContext.Provider value={value}>{children}</SalesContext.Provider>
    )
}

export const useSales = () => useContext(SalesContext)

export default SalesProvider
