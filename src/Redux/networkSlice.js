import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  network: [{}],
  from : "" , 
  trasanction : [{}]
}

export const networkSlice = createSlice({
  name: 'networks',
  initialState,
  reducers: {
    save: (state , action) => {
      state.network = action.payload
    },
    fromAddress : (state , action) => {
      state.from = action.payload
    },
    saveTransaction : (state , action) => {
      state.trasanction = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { save  , fromAddress , saveTransaction} = networkSlice.actions

export default networkSlice.reducer