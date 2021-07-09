import * as types from '../types'

export const SalesReducer = (state, action) => {
    const { type, payload } = action
    switch (type) {
        case types.CREATE_SALES_REQUEST:
            return {
                ...state,
                creating: true,
            }

        case types.CREATE_SALES_SUCCESS:
            return {
                ...state,
                creating: false,
                sales: [payload.item, ...state.sales],
            }
        case types.CREATE_SALES_FAIL:
            return {
                ...state,
                creating: false,
            }

        case types.FETCH_SALES_REQUEST:
            return {
                ...state,
                fetching: true,
            }

        case types.FETCH_SALES_SUCCESS:
            return {
                ...state,
                fetching: false,
                sales: payload.items,
            }
        case types.FETCH_SALES_FAIL:
            return {
                ...state,
                fetching: false,
            }
        case types.FETCH_SALES_BY_NAME_REQUEST:
            return {
                ...state,
                fetching: true,
            }

        case types.FETCH_SALES_BY_NAME_SUCCESS:
            return {
                ...state,
                fetching: false,
                sale: payload.item,
            }
        case types.FETCH_SALES_BY_NAME_FAIL:
            return {
                ...state,
                fetching: false,
            }

        case types.UPDATE_SALES_REQUEST:
            return {
                ...state,
                updating: true,
            }
        case types.UPDATE_SALES_SUCCESS:
            return {
                ...state,
                updating: false,
                sales: state.sales.map((prod) => {
                    if (prod._id === payload.item._id) {
                        prod = payload.item
                    }
                    return prod
                }),
            }
        case types.UPDATE_SALES_FAIL:
            return {
                ...state,
                updating: false,
            }
        case types.DELETE_SALES_REQUEST:
            return {
                ...state,
                deleting: true,
            }
        case types.DELETE_SALES_SUCCESS:
            return {
                ...state,
                deleting: false,
                sales: state.sales.filter((prod) => prod._id !== payload),
            }
        case types.DELETE_SALES_FAIL:
            return {
                ...state,
                deleting: false,
            }
        default:
            return state
    }
}
