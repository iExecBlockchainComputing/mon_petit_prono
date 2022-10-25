import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.js'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import ScrollToTop from './ScrollToTop.js'
import { store } from './utils/Store.js'
import { Provider } from 'react-redux'
import {WebProvider} from './utils/WebProvider.js'
import axios from 'axios'

/*axios.defaults.baseURL = 'https://api.pinata.cloud/pinning/pinFileToIPFS'
axios.defaults.headers.common[
  'Authorization'
] = `Bearer ${process.env.REACT_APP_PINIATA_JWT}`*/

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <WebProvider />
      <ScrollToTop />
      <App />
    </Provider>
  </BrowserRouter>,
)
