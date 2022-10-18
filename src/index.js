import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import ScrollToTop from './ScrollToTop'
import { store } from './utils/Store'
import { Provider } from 'react-redux'
import {WebProvider} from './utils/WebProvider'

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
