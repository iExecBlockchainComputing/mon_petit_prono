import { createSlice, configureStore } from '@reduxjs/toolkit'

const walletSlice = createSlice({
  name: 'wallet',
  initialState: {
    haveMetaMask: false,
    isConnected: false,
    accountAddress: '',
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
  },
})

const teamLoadingSlice = createSlice({
  name: 'teamLoading',
  initialState: {
    elemLoading: [],
  },
  reducers: {
    updateElemLoading: (state, action) => {
      state.elemLoading = action.payload
    },
  },
})

const forecastPronoSlice = createSlice({
  name: 'forecastProno',
  initialState: {
    prono: [],
  },
  reducers: {
    updateForecastProno: (state, action) => {
      state.prono = action.payload
    },
  },
})

export const store = configureStore({
  reducer: {
    wallet: walletSlice.reducer,
    teamLoading: teamLoadingSlice.reducer,
    forecastProno: forecastPronoSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})
