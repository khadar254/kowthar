import * as types from '../types'

export const AuthReducer = (state, action) => {
    const { type, payload } = action
    switch (type) {
        case types.LOGIN_REQUEST:
            return {
                ...state,
                logging: true,
            }
        case types.LOGIN_SUCCESS:
            localStorage.setItem('auth-token', payload.token)
            return {
                ...state,
                loggin: false,
                user: payload.user,
                isAuthenticated: true,
            }
        case types.LOGIN_FAIL:
            return {
                ...state,
                loggin: false,
            }
        case types.CREATE_USER_REQUEST:
            return {
                ...state,
                creating: true,
            }
        case types.CREATE_USER_SUCCESS:
            return {
                ...state,
                creating: false,
                users: [...state.users, payload.user],
            }
        case types.CREATE_USER_FAIL:
            return {
                ...state,
                creating: false,
            }
        case types.FETCH_USERS_REQUEST:
            return {
                ...state,
                fetching: true,
            }

        case types.FETCH_USERS_SUCCESS:
            return {
                ...state,
                fetching: false,
                users: payload.users,
            }
        case types.FETCH_USERS_FAIL:
            return {
                ...state,
                fetching: false,
            }
        case types.LOAD_USER_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case types.LOAD_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                user: payload.user,
                isAuthenticated: true,
            }

        case types.LOGOUT_REQUEST:
            return {
                ...state,
                loggingout: true,
            }

        case types.LOGOUT_SUCCESS:
            localStorage.removeItem('auth-token')
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                users: null,
                loggingout: false,
            }
        case types.LOGOUT_FAIL:
            return {
                ...state,
                loggingout: false,
            }

        case types.UPDATE_USER_REQUEST:
            return {
                ...state,
                updating: true,
            }
        case types.UPDATE_USER_SUCCESS:
            return {
                ...state,
                updating: false,
                users: state.users.map((user) => {
                    if (user._id === payload.user._id) {
                        user = payload.user
                    }
                    return user
                }),
            }
        case types.UPDATE_USER_FAIL:
            return {
                ...state,
                deleting: false,
            }
        case types.DELETE_USER_REQUEST:
            return {
                ...state,
                deleting: true,
            }
        case types.DELETE_USER_SUCCESS:
            return {
                ...state,
                deleting: false,
                users: state.users.filter((user) => user._id !== payload),
            }
        case types.DELETE_USER_FAIL:
            return {
                ...state,
                deleting: false,
            }
        default:
            return state
    }
}
