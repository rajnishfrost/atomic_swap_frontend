import { configureStore } from '@reduxjs/toolkit'
import networkReducer from './Redux/networkSlice'

export const store = configureStore({
  reducer: {
    network : networkReducer
  },
})