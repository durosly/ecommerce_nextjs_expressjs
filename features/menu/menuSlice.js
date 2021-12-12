import { createSlice } from '@reduxjs/toolkit'

export const menuSlice = createSlice({
    name: "menu",
    initialState: {
        displayMenu: false,
        displaySearch: false
    },
    reducers: {
        showMenu: state => {
            state.displayMenu = true
        },
        hideMenu: state => {
            state.displayMenu = false
        },
        toggleMenu: state => {
            state.displayMenu = !state.displayMenu
        }
    }
})

// SELECTOR
export const selectMenuDisplay = state => state.menu.displayMenu

// ACTIONS
export const { showMenu, hideMenu, toggleMenu } = menuSlice.actions

// REDUCER
export default menuSlice.reducer