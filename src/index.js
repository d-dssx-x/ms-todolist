import React from 'react'
import {render} from 'react-dom'
import {createStore, compose, applyMiddleware} from 'redux'
import {rootReducer} from './redux/reducers'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'

import {loadStore, saveStore} from './redux/localStore'
import App from './App'
import './index.scss'


// const prevState = loadStore()

const store = createStore(rootReducer,
    compose(applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__&&
      window.__REDUX_DEVTOOLS_EXTENSION__()))

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
