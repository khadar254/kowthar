import * as types from '../types'

export const ProductReducer = (state, action) => {
    const { type, payload } = action
    switch (type) {
        case types.CREATE_PRODUCT_REQUEST:
            return {
                ...state,
                creating: true,
            }
        case types.CREATE_PRODUCT_SUCCESS:
            return {
                ...state,
                creating: false,
                products: [payload.item, ...state.products],
            }
        case types.CREATE_PRODUCT_FAIL:
            return {
                ...state,
                creating: false,
            }
        case types.FETCH_PRODUCTS_REQUEST:
            return {
                ...state,
                fetching: true,
            }

        case types.FETCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                fetching: false,
                products: payload.items,
            }
        case types.FETCH_PRODUCTS_FAIL:
            return {
                ...state,
                fetching: false,
            }

        case types.UPDATE_PRODUCT_REQUEST:
            return {
                ...state,
                updating: true,
            }
        case types.UPDATE_PRODUCT_SUCCESS:
            return {
                ...state,
                updating: false,
                products: state.products.map((prod) => {
                    if (prod._id === payload.item._id) {
                        user = payload.item
                    }
                    return prod
                }),
            }
        case types.UPDATE_PRODUCT_FAIL:
            return {
                ...state,
                updating: false,
            }
        case types.DELETE_PRODUCT_REQUEST:
            return {
                ...state,
                deleting: true,
            }
        case types.DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                deleting: false,
                products: state.products.filter((prod) => prod._id !== payload),
            }
        case types.DELETE_PRODUCT_FAIL:
            return {
                ...state,
                deleting: false,
            }
        default:
            return state
    }
}
