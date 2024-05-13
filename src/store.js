import { configureStore } from '@reduxjs/toolkit'
import networkReducer from './Redux/networkSlice'
import authReducer  from './Redux/authSlice'

export const store = configureStore({
  reducer: {
    network : networkReducer ,
    auth : authReducer ,
  },
})