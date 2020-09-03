import React from 'react'
import PropTypes from 'prop-types'
import {useSelector} from 'react-redux'
import {DndProvider} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'
import Header from './components/Header'
import LeftBar from './components/LeftBar'
import RightBar from './components/RightBar'
import ModalWindow from './components/ModalWindow'
import DeleteAlert from './components/DeleteAlert'
import './index.scss'


const Wrapper = ({children}) => {
  const system = useSelector((state) => state.system)
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="container">
        <Header />
        <LeftBar />
        {children}
        {!!system.selectedTasks &&
        <RightBar
          id={system.selectedTasks}
        />}
        <ModalWindow/>
      </div>
      <DeleteAlert />
    </DndProvider>
  )
}

Wrapper.propTypes = {
  children: PropTypes.element,
}

export default Wrapper

