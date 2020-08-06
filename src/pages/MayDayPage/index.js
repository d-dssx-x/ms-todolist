import React from 'react'
import Tasks from '../../components/Tasks'
import {useSelector} from 'react-redux'

const MyDayPage = () => {
  const tasks = useSelector((state) => state.tasks)
      .filter((el) => el.myday )
  return (
    <Tasks
      tasks={tasks}
      disabledInput={true}
      title="My Day"
      isMyDay={true}
      listId='tasks'
      disableDelete/>
  )
}

export default MyDayPage
