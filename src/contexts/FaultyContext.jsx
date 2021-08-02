import React, {
    createContext,
    useContext,
    useReducer,
    useCallback,
} from 'react'
import * as types from './types'
import { FaultyProductReducer } from './reducers/FaultyProductReducer'
import axios from 'axios'
import { config } from '../utils/axiosConfig'
import { useAlert } from './AlertsContext'

const FaultyProductContext = createContext({})

const initialState = {
    products: [],
    fetching: false,
    creating: false,
    updating: false,
    deleting: false,
}

function FaultyProductProvider({ children }) {
    const [state, dispatch] = useReducer(FaultyProductReducer, initialState)

    const { setMessage, setError } = useAlert()

    async function addFaultyProduct(product) {
        try {
            dispatch({
                type: types.CREATE_FAULTY_PRODUCT_REQUEST,
            })
            const { data } = await axios.post(
                '/api/faultyproducts',
                product,
                config()
            )

            dispatch({
                type: types.CREATE_FAULTY_PRODUCT_SUCCESS,
                payload: data,
            })

            setMessage(data.message)
        } catch (error) {
            const { data } = error.response
            dispatch({ type: types.CREATE_FAULTY_PRODUCT_FAIL })
            // show Error
            setError(data.message)
        }
    }

    const fetchFaultyProducts = useCallback(async () => {
        try {
            dispatch({
                type: types.FETCH_FAULTY_PRODUCTS_REQUEST,
            })

            const { data } = await axios.get('/api/faultyproducts', config())

            dispatch({
                type: types.FETCH_FAULTY_PRODUCTS_SUCCESS,
                payload: data,
            })
        } catch (error) {
            dispatch({ type: types.FETCH_FAULTY_PRODUCTS_FAIL })
        }
    }, [])

    async function updateFaultyProduct(id, update) {
        try {
            dispatch({
                type: types.UPDATE_FAULTY_PRODUCT_REQUEST,
            })

            const { data } = await axios.put(
                `/api/faultyproducts/${id}`,
                update,
                config()
            )

            dispatch({
                type: types.UPDATE_FAULTY_PRODUCT_SUCCESS,
                payload: data,
            })

            setMessage(data.message)
        } catch (error) {
            console.log(error)
            dispatch({ type: types.UPDATE_FAULTY_PRODUCT_FAIL })
            // show error
            setError(error?.response.data.message)
        }
    }
    async function deleteFaultyProduct(id) {
        try {
            dispatch({
                type: types.DELETE_FAULTY_PRODUCT_REQUEST,
            })

            const { data = {} } = await axios.delete(
                `/api/faultyproducts/${id}`,
                config()
            )

            dispatch({
                type: types.DELETE_FAULTY_PRODUCT_SUCCESS,
                payload: id,
            })

            setMessage(data.message)
        } catch (error) {
            const { data } = error.response
            dispatch({ type: types.DELETE_FAULTY_PRODUCT_FAIL })
            // show error
            setError(data.message)
        }
    }

    const value = {
        ...state,
        addFaultyProduct,
        fetchFaultyProducts,
        updateFaultyProduct,
        deleteFaultyProduct,
    }
    return (
        <FaultyProductContext.Provider value={value}>
            {children}
        </FaultyProductContext.Provider>
    )
}

export const useFaultyProduct = () => useContext(FaultyProductContext)

export default FaultyProductProvider
