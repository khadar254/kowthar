import React, {
    createContext,
    useContext,
    useReducer,
    useCallback,
} from 'react'
import * as types from './types'
import { InventoryReducer } from './reducers/InventoryReducer'
import axios from 'axios'
import { config } from '../utils/axiosConfig'
import { useAlert } from './AlertsContext'

const InventoryContext = createContext({})

const initialState = {
    inventory: [],
    fetching: false,
    creating: false,
    updating: false,
}

function InventoryProvider({ children }) {
    const [state, dispatch] = useReducer(InventoryReducer, initialState)

    const { setMessage, setError } = useAlert()

    async function createInventory(inventory) {
        try {
            dispatch({
                type: types.CREATE_INVENTORY_REQUEST,
            })
            const { data } = await axios.post(
                '/api/inventory',
                inventory,
                config()
            )

            dispatch({
                type: types.CREATE_INVENTORY_SUCCESS,
                payload: data,
            })

            setMessage(data.message)
        } catch (error) {
            const { data } = error.response
            dispatch({ type: types.CREATE_INVENTORY_FAIL })
            // show Error
            setError(data.message)
        }
    }

    const fetchInventory = useCallback(async () => {
        try {
            dispatch({
                type: types.FETCH_INVENTORY_REQUEST,
            })

            const { data } = await axios.get('/api/inventory', config())

            dispatch({
                type: types.FETCH_INVENTORY_SUCCESS,
                payload: data,
            })
        } catch (error) {
            dispatch({ type: types.FETCH_INVENTORY_FAIL })
        }
    }, [])

    const fetchInventoryByDate = useCallback(async (from, to) => {
        try {
            dispatch({
                type: types.FETCH_INVENTORY_REQUEST,
            })

            const { data = {} } = await axios.get(
                `/api/inventory/byDate/${from}/${to}`,
                config()
            )

            dispatch({
                type: types.FETCH_INVENTORY_SUCCESS,
                payload: data,
            })
        } catch (error) {
            dispatch({ type: types.FETCH_INVENTORY_FAIL })
        }
    }, [])

    async function updateInventory(id, update) {
        try {
            dispatch({
                type: types.UPDATE_INVENTORY_REQUEST,
            })

            const { data } = await axios.put(
                `/api/inventory/${id}`,
                update,
                config()
            )

            dispatch({
                type: types.UPDATE_INVENTORY_SUCCESS,
                payload: data,
            })

            setMessage(data.message)
        } catch (error) {
            const { data } = error.response

            dispatch({ type: types.UPDATE_INVENTORY_FAIL })
            // show error
            setError(data.message)
        }
    }

    const value = {
        ...state,
        createInventory,
        fetchInventory,
        updateInventory,
        fetchInventoryByDate,
    }
    return (
        <InventoryContext.Provider value={value}>
            {children}
        </InventoryContext.Provider>
    )
}

export const useInventory = () => useContext(InventoryContext)

export default InventoryProvider
