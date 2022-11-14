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
