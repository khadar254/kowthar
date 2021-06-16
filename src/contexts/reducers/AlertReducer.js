import * as types from '../types'

export function AlertReducer(state, action) {
    const { type, payload } = action
    switch (type) {
        case types.SET_ERROR:
            return {
                ...state,
                error: payload,
            }
        case types.SET_MESSAGE:
            return {
                ...state,
                message: payload,
            }
        case types.CLEAR_ALERTS:
            return {
                ...state,
                message: null,
                error: null,
            }
        default:
            return state
    }
}
