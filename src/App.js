import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import {useRouter} from './routes'
import Header from './components/Header'
import LeftBar from './components/LeftBar'
import './index.scss'
import RightBar from './components/RightBar'
import {useSelector} from 'react-redux'
import {DndProvider} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'

const App = () => {
  const routes = useRouter(true)
  const system = useSelector((state) => state.system)
  return (
    <BrowserRouter>
      <DndProvider backend={HTML5Backend}>
        <div className="container">
          <Header />
          <LeftBar />
          {routes}
          {!!system.selectedTasks &&
          <RightBar
            id={system.selectedTasks}
          />}
        </div>
      </DndProvider>
    </BrowserRouter>
  )
}

export default App

