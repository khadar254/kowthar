import * as types from '../types'

export const CustomerReducer = (state, action) => {
    const { type, payload } = action
    switch (type) {
        case types.FETCH_CUSTOMERS_REQUEST:
            return {
                ...state,
                fetching: true,
            }

        case types.FETCH_CUSTOMERS_SUCCESS:
            return {
                ...state,
                fetching: false,
                customers: payload.items,
            }
        case types.FETCH_CUSTOMERS_FAIL:
            return {
                ...state,
                fetching: false,
            }

        case types.UPDATE_CUSTOMER_REQUEST:
            return {
                ...state,
                updating: true,
            }
        case types.UPDATE_CUSTOMER_SUCCESS:
            return {
                ...state,
                updating: false,
                customers: state.customers.map((prod) => {
                    if (prod._id === payload.item._id) {
                        prod = payload.item
                    }
                    return prod
                }),
            }
        case types.UPDATE_CUSTOMER_FAIL:
            return {
                ...state,
                updating: false,
            }
        case types.DELETE_CUSTOMER_REQUEST:
            return {
                ...state,
                deleting: true,
            }
        case types.DELETE_CUSTOMER_SUCCESS:
            return {
                ...state,
                deleting: false,
                customers: state.customers.filter(
                    (prod) => prod._id !== payload
                ),
            }
        case types.DELETE_CUSTOMER_FAIL:
            return {
                ...state,
                deleting: false,
            }
        default:
            return state
    }
}
