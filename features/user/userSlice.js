import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    id: null,
    email: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.id = action.payload.id
            state.email = action.payload.email
        }
    }
})

// SELECTORS
export const selectUserEmail = state => state.user.email
export const selectUserId = state => state.user.id

// ACTIONS
export const { setUser } = userSlice.actions

// REDUCER
export default userSlice.reducer