import React from 'react'
import {useRouter} from './routes'
import {useSelector} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
import './index.scss'


const App = () => {
  // TODO: Make server side
  const {token} = useSelector((state) => state.system)
  const routes = useRouter(!!token)
  return (
    <BrowserRouter>
      {routes}
    </BrowserRouter>
  )
}

export default App

