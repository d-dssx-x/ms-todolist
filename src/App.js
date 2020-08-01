import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import {useRouter} from './routes'
import Header from './components/Header'
import LeftBar from './components/LeftBar'
import './index.scss'

const App = () => {
  const routes = useRouter(true)
  return (
    <BrowserRouter>
      <div className="task-page">
        <Header />
        <LeftBar />
        {routes}
      </div>
    </BrowserRouter>
  )
}

export default App

