import React, {useEffect} from 'react'
import Field from '../../components/Field'
import {useSelector, useDispatch} from 'react-redux'
import moment from 'moment'
import TasksBlock from '../../components/TasksBlock'
import {showModal, selectTask} from '../../redux/actions'

const PlannedPage = () => {
  const tasks = useSelector((state) => state.tasks)

  const today = moment().format('L')
  const tomorrow = moment().add(1, 'day').format('L')

  const todayTasks = tasks.filter((el) => el.due === today)
      .sort((a, b) => a.done - b.done)

  const tomorrowTasks = tasks.filter((el) => el.due === tomorrow)

  const earlierTasks = tasks.filter((el) => el.due < today)

  const otherTasks = tasks
      .filter((el) => el.due !== today && el.due !== tomorrow && el.due > today)

  const dispatch = useDispatch()
  useEffect(() => {
    const onContext = (event) => {
      event.preventDefault()
      const clientHight = document.documentElement.clientHeight
      if (event.target.id.split('-')[0] === 'item') {
        if (event.pageY + 160 < clientHight) {
          dispatch(showModal({
            x: event.pageX,
            y: event.pageY,
            id: event.target.id.split('-')[1],
          }))
        } else {
          dispatch(showModal({
            x: event.pageX,
            y: event.pageY - 160,
            id: event.target.id.split('-')[1],
          }))
        }
        dispatch(selectTask(null))
        return false
      }
    }
    const target = document.querySelector('#tasks')
    target.addEventListener('contextmenu', onContext)

    return () => target.removeEventListener('contextmenu', onContext)
  }, [])

  return (
    <div
      className="tasks">
      <div className="tasks__header">
        <input
          className="tasks__title"
          disabled
          defaultValue="Palnned"/>
      </div>
      <Field
        listId="tasks"
        isPlanned
        placeholder="Add a task due today"/>
      <div
        id="tasks"
        className="block">
        {!!todayTasks.length &&
        <TasksBlock
          _open
          title="Today"
          currentList={'tasks'}
          showList={true}
          tasks={todayTasks}
        />
        }
        {!!tomorrowTasks.length &&
        <TasksBlock
          title="Tomorrow"
          currentList={'tasks'}
          showList={true}
          tasks={tomorrowTasks}
        />
        }
        {!!earlierTasks.length &&
        <TasksBlock
          title="Earlier"
          currentList={'tasks'}
          showList={true}
          tasks={earlierTasks}
        />
        }
        {!!otherTasks.length &&
        <TasksBlock
          title="Later"
          currentList={'tasks'}
          showList={true}
          tasks={otherTasks}
        />
        }
      </div>
    </div>
  )
}

export default PlannedPage
