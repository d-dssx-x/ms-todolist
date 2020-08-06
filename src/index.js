import React from 'react'
import {render} from 'react-dom'
import './index.scss'
import App from './App'
import {createStore, compose, applyMiddleware} from 'redux'
import {rootReducer} from './redux/reducers'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'

const store = createStore(rootReducer,
    compose(window.__REDUX_DEVTOOLS_EXTENSION__&&
    window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(thunk)))


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
