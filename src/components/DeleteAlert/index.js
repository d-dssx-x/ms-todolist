import React, {useState, useEffect} from 'react'
import './index.scss'
import {useSelector, useDispatch} from 'react-redux'
import {
  hideDeleteAlert,
  deleteList,
  deleteTasksByListId,
  deleteTask,
  selectTask} from '../../redux/actions'
import {Link} from 'react-router-dom'

const DeleteAlert = () => {
  const options = useSelector((state) => state.system).deleteAlert
  const [item, setItem] = useState({})
  const tasks = useSelector((state) => state.tasks)
  const lists = useSelector((state) => state.lists)
  const dispatch = useDispatch()

  useEffect(() => {
    if (options.type === 'list') {
      setItem(lists.find((el) => el.id === options.id))
    }
    if (options.type === 'task') {
      setItem(tasks.find((el) => el.id === options.id))
    }
  }, [options, lists, tasks])

  const onClickDeleteHandler = () => {
    if (options.type === 'list') {
      dispatch(deleteTasksByListId(options.id))
      dispatch(deleteList(options.id))
      dispatch(hideDeleteAlert())
    }
    if (options.type === 'task') {
      dispatch(selectTask(null))
      dispatch(deleteTask(options.id))
      dispatch(hideDeleteAlert())
    }
  }

  return (
    <>
      {options.show &&
      <div className="delete-alert">
        <div className="delete-alert__block">
          <div className="delete-alert__title">
            <span className="delete-alert__item">{`"${item.title}" `}</span>
            will be permanently deleted
          </div>
          <div className="delete-alert__buttons">
            <button
              onClick={() => dispatch(hideDeleteAlert())}
              className="delete-alert__button">Canel</button>
            {options.type === 'list' &&
            <Link
              className="delete-alert__button_link"
              to="/">
              <button
                onClick={onClickDeleteHandler}
                className="delete-alert__button delete-alert__button_delete">
                  Delete
              </button>
            </Link>
            }
            {options.type === 'task' &&
            <button
              onClick={onClickDeleteHandler}
              className="delete-alert__button delete-alert__button_delete">
                Delete
            </button>
            }
          </div>
        </div>
      </div>}
    </>
  )
}

export default DeleteAlert
