import React, {
    createContext,
    useContext,
    useReducer,
    useCallback,
} from 'react'
import * as types from './types'
import { ProductReducer } from './reducers/ProductReducer'
import axios from 'axios'
import { config } from '../utils/axiosConfig'
import { useAlert } from './AlertsContext'

const ProductContext = createContext({})

const initialState = {
    products: [],
    fetching: false,
    creating: false,
    updating: false,
    deleting: false,
}

function ProductProvider({ children }) {
    const [state, dispatch] = useReducer(ProductReducer, initialState)

    const { setMessage, setError } = useAlert()

    async function createProduct(product) {
        try {
            dispatch({
                type: types.CREATE_PRODUCT_REQUEST,
            })
            const { data } = await axios.post(
                '/api/products',
                product,
                config()
            )

            dispatch({
                type: types.CREATE_PRODUCT_SUCCESS,
                payload: data,
            })
        } catch (error) {
            const { data } = error.response
            dispatch({ type: types.CREATE_PRODUCT_FAIL })
            // show Error
            setError(data.message)
        }
    }

    const fetchProducts = useCallback(async () => {
        try {
            dispatch({
                type: types.FETCH_PRODUCTS_REQUEST,
            })

            const { data } = await axios.get('/api/products', config())

            dispatch({
                type: types.FETCH_PRODUCTS_SUCCESS,
                payload: data,
            })
        } catch (error) {
            dispatch({ type: types.FETCH_PRODUCTS_FAIL })
        }
    }, [])

    async function updateProduct(id, update) {
        try {
            dispatch({
                type: types.UPDATE_PRODUCT_REQUEST,
            })

            const { data } = await axios.put(
                `/api/products/${id}`,
                update,
                config()
            )

            dispatch({
                type: types.UPDATE_PRODUCT_SUCCESS,
                payload: data,
            })

            setMessage(data.message)
        } catch (error) {
            const { data } = error.response

            dispatch({ type: types.UPDATE_PRODUCT_FAIL })
            // show error
            setError(data.message)
        }
    }
    async function deleteProduct(id) {
        try {
            dispatch({
                type: types.DELETE_PRODUCT_REQUEST,
            })

            const { data } = await axios.delete(`/api/products/${id}`, config())

            dispatch({
                type: types.DELETE_PRODUCT_SUCCESS,
                payload: id,
            })

            if (data.message === 'ok') {
                setMessage('product has been deleted')
            }
        } catch (error) {
            const { data } = error.response
            dispatch({ type: types.DELETE_PRODUCT_FAIL })
            // show error
            setError(data.message)
        }
    }

    const value = {
        ...state,
        createProduct,
        fetchProducts,
        updateProduct,
        deleteProduct,
    }
    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    )
}

export const useProduct = () => useContext(ProductContext)

export default ProductProvider
