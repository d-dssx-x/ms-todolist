import React, {useEffect} from 'react'
import {useRouter} from './routes'
import {useDispatch, useSelector} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
import {fetchLists, fetchTasks} from './redux/actions'
import './index.scss'


const App = () => {
  // TODO: Make server side
  const {token} = useSelector((state) => state.system)
  const routes = useRouter(!!token)

  const dispatch = useDispatch()

  useEffect(() => {
    if (token) {
      dispatch(fetchLists(token))
      dispatch(fetchTasks(token))
    }
  }, [token])
  return (
    <BrowserRouter>
      {routes}
    </BrowserRouter>
  )
}

export default App

