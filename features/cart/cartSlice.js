import { createSlice, createSelector } from '@reduxjs/toolkit'
export const LOCAL_STRORAGE_NAME = "SAFEPLAZE_CART"

let storageData = null//JSON.parse(window.localStorage.getItem(LOCAL_STRORAGE_NAME))
if(typeof window !== "undefined") {
    storageData = JSON.parse(localStorage.getItem(LOCAL_STRORAGE_NAME))
}

const initialState = storageData || { items: [], numberOfItems: 0 }

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItemToCart: (state, action) => {
            state.items.push(action.payload.item)
            state.numberOfItems = state.numberOfItems + 1
            if(action.payload.status === false) {
                localStorage.setItem(LOCAL_STRORAGE_NAME, JSON.stringify(state))
            }
        },
        removeItemFromCart: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload.id)
            state.numberOfItems = state.numberOfItems - 1
            if(action.payload.status === false) {
                localStorage.setItem(LOCAL_STRORAGE_NAME, JSON.stringify(state))
            }
        },
        increaseItemQuantity: (state, action) => {
            const index = state.items.findIndex(item => item.id === action.payload.id)
            state.items[index].quantity++
            if(action.payload.status === false) {
                localStorage.setItem(LOCAL_STRORAGE_NAME, JSON.stringify(state))
            }
        },
        decreaseItemQuantity: (state, action) => {
            const index = state.items.findIndex(item => item.id === action.payload.id)
            if(state.items[index].quantity > 1){
                state.items[index].quantity--
            } else {
                state.items = state.items.filter(item => item.id !== action.payload.id)
                state.numberOfItems = state.numberOfItems - 1
            }
            if(action.payload.status === false) {
                localStorage.setItem(LOCAL_STRORAGE_NAME, JSON.stringify(state))
            }
        },
        setUpCart: (state, action) => {
            state.items = action.payload
            state.numberOfItems = action.payload.length
        }
    }
})

// SELECTOR
export const selectCartItems = state => state.cart.items
export const selectNumberOfItemsInCart = state => state.cart.numberOfItems
// export const selectCartItem = (state) => {
//     console.log(state)
//     return state.cart.items
//     // const index = state.cart.items.findIndex(item => item.id === id)
//     // if(index > -1) {
//     //     return state.items[index]
//     // }
// }

export const selectCartItem = createSelector(
    state => state.cart.items,
    (state, productId) => productId
    ,
    (items, productId) => {
        const index = items.findIndex(item => item.id === productId)
        if(index > -1) {
            return items[index]
        } else {
            return false
        }
    }
)

// ACTIONS
export const { addItemToCart, removeItemFromCart, increaseItemQuantity, decreaseItemQuantity, setUpCart } = cartSlice.actions

// REDUCER
export default cartSlice.reducer