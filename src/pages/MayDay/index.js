import React from 'react'
import Tasks from '../../components/Tasks'
import {useSelector} from 'react-redux'
import moment from 'moment'

const MyDay = () => {
  const tasks = useSelector((state) => state.tasks).filter((el) => {
    if (el.remind) return el.remind.split('|')[0] === moment().format('L')
    if (el.due) return el.due === moment().format('L')
  })
  return (
    <Tasks
      tasks={tasks}
      disabledInput={true}
      title="MyDay"
      isMyDay={true}
      listId='tasks-myday'/>
  )
}

export default MyDay
