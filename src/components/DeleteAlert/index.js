import React, {useState, useEffect} from 'react'
import './index.scss'
import {useSelector, useDispatch} from 'react-redux'
import {
  hideDeleteAlert,
  deleteList,
  deleteTasksByListId,
  deleteTask,
  selectTask, fetchTasks
} from '../../redux/actions'
import {Link} from 'react-router-dom'

const DeleteAlert = () => {
  const {deleteAlert, token} = useSelector((state) => state.system)
  const [item, setItem] = useState({})
  const tasks = useSelector((state) => state.tasks)
  const lists = useSelector((state) => state.lists)
  const dispatch = useDispatch()

  useEffect(() => {
    if (deleteAlert.type === 'list') {
      setItem(lists.find((el) => el.id === deleteAlert.id))
    }
    if (deleteAlert.type === 'task') {
      setItem(tasks.find((el) => el.id === deleteAlert.id))
    }
  }, [deleteAlert, lists, tasks])

  const onClickDeleteHandler = () => {
    if (deleteAlert.type === 'list') {
      dispatch(deleteList(token, deleteAlert.id))
    }
    if (deleteAlert.type === 'task') {
      dispatch(deleteTask(token, deleteAlert.id))
    }
  }

  return (
    <>
      {deleteAlert.show &&
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
            {deleteAlert.type === 'list' &&
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
            {deleteAlert.type === 'task' &&
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
