import React from 'react'

import Tasks from '../../components/Tasks'
import {useSelector} from 'react-redux'
import '../../index.scss'


const ImportantPage = () => {
  const tasks = useSelector((state) => state.tasks).filter((el) => el.important)
  return (
    <Tasks
      title="Important"
      tasks={tasks}
      showList
      listId='tasks'
      important/>
  )
}

export default ImportantPage
