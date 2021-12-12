import { configureStore } from '@reduxjs/toolkit'
import menuReducer from '../features/menu/menuSlice'
import searchReducer from '../features/search/searchSlice'
import userReducer from '../features/user/userSlice'
import dashboardReducer from '../features/dashboard/dashboardSlice'
import cartReducer from '../features/cart/cartSlice'

export default configureStore({
    reducer: {
        menu: menuReducer,
        search: searchReducer,
        user: userReducer,
        dashboard: dashboardReducer,
        cart: cartReducer
    }
})