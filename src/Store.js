import { createSlice, configureStore } from '@reduxjs/toolkit'

const walletSlice = createSlice({
  name: 'wallet',
  initialState: {
    haveMetaMask: false,
    isConnected: false,
    accountAddress: '',
    contract: null,
    provider: null
  },
  reducers: {
    haveMetamask: (state, action) => {
      state.haveMetaMask = action.payload
    },
    isConnected: (state, action) => {
      state.isConnected = action.payload
    },
    accountAddress: (state, action) => {
      state.accountAddress = action.payload
    },
    setContract: (state, action) => {
      state.contract = action.payload
    },
    setProvider: (state, action) => {
      state.provider = action.payload
    }
  },
})

export const store = configureStore({
  reducer: {
    wallet: walletSlice.reducer,
  },
})
