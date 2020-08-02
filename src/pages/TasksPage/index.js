import React from 'react'
import Tasks from '../../components/Tasks'
import {useSelector} from 'react-redux'


const TasksPage = () => {
  const tasks = useSelector((state) => state.tasks)
  return (
    <Tasks
      disabledInput={true}
      title="Tasks"
      tasks={tasks}
      listId='tasks'/>
  )
}

export default TasksPage
