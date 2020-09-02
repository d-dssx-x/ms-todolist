import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import {useRouter} from './routes'
import Header from './components/Header'
import LeftBar from './components/LeftBar'
import RightBar from './components/RightBar'
import {useSelector} from 'react-redux'
import {DndProvider} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'
import ModalWindow from './components/ModalWindow'
import DeleteAlert from './components/DeleteAlert'
import './index.scss'

const App = () => {
  // TODO: Make server side
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
          <ModalWindow/>
        </div>
        <DeleteAlert />
      </DndProvider>
    </BrowserRouter>
  )
}

export default App

