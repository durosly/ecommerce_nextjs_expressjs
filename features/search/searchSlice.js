import { createSlice } from '@reduxjs/toolkit'

export const searchSlice = createSlice({
    name: "search",
    initialState: {
        display: false
    },
    reducers: {
        hideSearch: state => {
            state.display = false
        },
        showSearch: state => {
            state.display = true
        },
        toggleSearch: state => {
            state.display = !state.display
        }
    }
})

// SELECTORS
export const selectSearchDisplay = state => state.search.display

// ACTIONS
export const { hideSearch, showSearch, toggleSearch } = searchSlice.actions

// REDUCER
export default searchSlice.reducer