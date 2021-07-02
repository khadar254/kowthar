import * as types from '../types'

export const InventoryReducer = (state, action) => {
    const { type, payload } = action
    switch (type) {
        case types.CREATE_INVENTORY_REQUEST:
            return {
                ...state,
                creating: true,
            }
        case types.CREATE_INVENTORY_SUCCESS:
            return {
                ...state,
                creating: false,
                inventory: [...state.inventory, payload.item],
            }
        case types.CREATE_INVENTORY_FAIL:
            return {
                ...state,
                creating: false,
            }
        case types.FETCH_INVENTORY_REQUEST:
            return {
                ...state,
                fetching: true,
            }

        case types.FETCH_INVENTORY_SUCCESS:
            return {
                ...state,
                fetching: false,
                inventory: payload.items,
            }
        case types.FETCH_INVENTORY_FAIL:
            return {
                ...state,
                fetching: false,
            }

        case types.UPDATE_INVENTORY_REQUEST:
            return {
                ...state,
                updating: true,
            }
        case types.UPDATE_INVENTORY_SUCCESS:
            return {
                ...state,
                updating: false,
                inventory: state.inventory.map((prod) => {
                    if (prod._id === payload.item._id) {
                        user = payload.item
                    }
                    return prod
                }),
            }
        case types.UPDATE_INVENTORY_FAIL:
            return {
                ...state,
                updating: false,
            }

        default:
            return state
    }
}
