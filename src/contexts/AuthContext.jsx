import React, { createContext, useContext, useReducer, useEffect } from 'react'
import * as types from './types'
import { AuthReducer } from './reducers/AuthReducer'
import axios from 'axios'
import { config } from '../utils/axiosConfig'
import { useAlert } from './AlertsContext'

const AuthContext = createContext({})

const initialState = {
    token: localStorage.getItem('auth-token'),
    user: null,
    users: [],
    loading: false,
    loggin: false,
    loggingout: false,
    fetching: false,
    creating: false,
    updating: false,
    deleting: false,
    isAuthenticated: false,
}

function AuthProvider({ children }) {
    const [state, dispatch] = useReducer(AuthReducer, initialState)

    const { setMessage, setError } = useAlert()

    async function login(cred) {
        try {
            dispatch({
                type: types.LOGIN_REQUEST,
            })
            const { data } = await axios.post('/api/auth/login', cred, config())

            dispatch({
                type: types.LOGIN_SUCCESS,
                payload: data,
            })
        } catch (error) {
            console.error(error.response)
            const { data } = error.response
            dispatch({ type: types.LOGIN_FAIL })
            // show Error
            setError(data.message)
        }
    }
    async function logout(id) {
        try {
            dispatch({
                type: types.LOGOUT_REQUEST,
            })

            const update = {
                lastLoggedInAt: Date.now(),
            }

            const { data } = await axios.put(
                `/api/auth/user/${id}`,
                update,
                config()
            )

            if (!data.message === 'ok') {
                dispatch({
                    type: types.LOGOUT_FAIL,
                })
            } else {
                dispatch({
                    type: types.LOGOUT_SUCCESS,
                })
            }
        } catch (error) {
            const { data } = error.response

            dispatch({ type: types.LOGOUT_FAIL })
            // show Error
            setError(data.message)
        }
    }

    async function createUser(user) {
        try {
            dispatch({
                type: types.CREATE_USER_REQUEST,
            })

            const { data } = await axios.post(
                '/api/auth/createuser',
                user,
                config()
            )

            dispatch({
                type: types.CREATE_USER_SUCCESS,
                payload: data,
            })

            setMessage(data.message)
        } catch (error) {
            const { data } = error.response

            dispatch({ type: types.CREATE_USER_FAIL })
            // show error
            setError(data.message)
        }
    }

    async function fetchUsers() {
        try {
            dispatch({
                type: types.FETCH_USERS_REQUEST,
            })

            const { data } = await axios.get('/api/auth/users', config())

            dispatch({
                type: types.FETCH_USERS_SUCCESS,
                payload: data,
            })
        } catch (error) {
            const { data } = error.response

            dispatch({ type: types.FETCH_USERS_FAIL })
            // show error
            setError(data.message)
        }
    }
    async function updateUser(id, update) {
        try {
            dispatch({
                type: types.UPDATE_USER_REQUEST,
            })

            const { data } = await axios.put(
                `/api/auth/users/${id}`,
                update,
                config()
            )

            dispatch({
                type: types.UPDATE_USER_SUCCESS,
                payload: data,
            })

            setMessage(data.message)
        } catch (error) {
            const { data } = error.response

            dispatch({ type: types.UPDATE_USER_FAIL })
            // show error
            setError(data.message)
        }
    }
    async function deleteUser(id) {
        try {
            dispatch({
                type: types.DELETE_USER_REQUEST,
            })

            const { data } = await axios.get(`/api/auth/users/${id}`, config())

            dispatch({
                type: types.DELETE_USER_SUCCESS,
                payload: id,
            })

            if (data.message === 'ok') {
                setMessage('user has been deleted')
            }
        } catch (error) {
            const { data } = error.response
            dispatch({ type: types.DELETE_USER_FAIL })
            // show error
            setError(data.message)
        }
    }

    const loadUser = async () => {
        try {
            dispatch({
                type: types.LOAD_USER_REQUEST,
            })

            const { data } = await axios.get(
                '/api/auth/users/loaduser',
                config()
            )

            dispatch({
                type: types.LOAD_USER_SUCCESS,
                payload: data,
            })
        } catch (error) {
            dispatch({ type: types.LOAD_USER_FAIL })
        }
    }

    useEffect(() => {
        loadUser()
    }, [])

    const value = {
        ...state,
        login,
        logout,
        loadUser,
        createUser,
        fetchUsers,
        updateUser,
        deleteUser,
    }
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)

export default AuthProvider
