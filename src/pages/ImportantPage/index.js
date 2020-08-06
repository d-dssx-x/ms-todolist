import React from 'react'

import Tasks from '../../components/Tasks'
import {useSelector} from 'react-redux'
import '../../index.scss'


const ImportantPage = () => {
  const tasks = useSelector((state) => state.tasks).filter((el) => el.important)
  return (
    <Tasks
      disabledInput={true}
      title="Important"
      tasks={tasks}
      listId='tasks'
      important
      disableDelete/>
  )
}

export default ImportantPage
