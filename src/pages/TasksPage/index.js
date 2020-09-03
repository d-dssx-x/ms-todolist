import React from 'react'
import {useSelector} from 'react-redux'
import Tasks from '../../components/Tasks'


const TasksPage = () => {
  const tasks = useSelector((state) => state.tasks)
      .filter((el) => el.listId === 'tasks')
  return (
    <Tasks
      disabledInput={true}
      title="Tasks"
      tasks={tasks}
      listId='tasks'
      disableDelete/>
  )
}

export default TasksPage
