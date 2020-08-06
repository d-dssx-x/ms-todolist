import React from 'react'
import Tasks from '../../components/Tasks'
import {useSelector} from 'react-redux'


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
