import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    displayNav: false,
    categories: [],
    products: []
}

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {
        showNav: state => {
            state.displayNav = true
        },
        hideNav: state => {
            state.displayNav = false
        },
        toggleNav: state => {
            state.displayNav = !state.displayNav
        },
        setCategories: (state, action) => {
            state.categories = [...action.payload]
        },
        addToCategories: (state, action) => {
            state.categories = [...state.categories, action.payload]
        },
        removeFromCategories: (state, action) => {
            state.categories = state.categories.filter(c => c.id !== action.payload)
        },
        updateCategory: (state, action) => {
            state.categories = state.categories.map(c => {
                if(c.id === action.payload.id) {
                    c.name = action.payload.newName
                }
                return c
            })
        },
        setProducts: (state, action) => {
            state.products = [...action.payload]
        }
    }
})

// ACTIONS
export const { 
    showNav, 
    hideNav, 
    toggleNav,  
    setCategories,
    addToCategories,
    removeFromCategories,
    updateCategory,
    setProducts
} = dashboardSlice.actions

// SELECTORS
export const selectDisplayNav = state => state.dashboard.displayNav
export const selectCategories = state => state.dashboard.categories
export const selectProducts = state => state.dashboard.products

// REDUCER
export default dashboardSlice.reducer