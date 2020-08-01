import React from 'react'
import {render} from 'react-dom'
import './index.scss'
import App from './App'
import { createStore, compose } from 'redux'
import { rootReducer } from './redux/reducers'
import { Provider } from 'react-redux'

const store = createStore(rootReducer,
    compose(window.__REDUX_DEVTOOLS_EXTENSION__&&
    window.__REDUX_DEVTOOLS_EXTENSION__()))


const AppWrapper = () => (
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
)

render(
    <AppWrapper />,
    document.getElementById('root'),
)
