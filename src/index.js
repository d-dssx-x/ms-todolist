import React from 'react'
import {render} from 'react-dom'
import './index.scss'
import App from './App'
import {createStore, compose, applyMiddleware} from 'redux'
import {rootReducer} from './redux/reducers'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import {loadStore, saveStore} from './redux/localStore'

const prevState = loadStore()

const store = createStore(rootReducer, prevState,
    compose(window.__REDUX_DEVTOOLS_EXTENSION__&&
    window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk)))

store.subscribe(() => {
  saveStore(store.getState())
})


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
