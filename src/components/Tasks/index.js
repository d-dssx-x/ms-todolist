import React, {useRef, useEffect} from 'react'
import './index.scss'
import PropTypes from 'prop-types'
import Field from '../Field'
import Item from '../Item'
import {useDispatch} from 'react-redux'
import {
  changeTitleList,
  selectTask,
  hideModal,
  showModal,
  hideListModal,
  showDeleteAlert} from '../../redux/actions'
import moment from 'moment'
import TasksBlock from '../TasksBlock'

const Tasks = ({
  title,
  tasks,
  showList,
  listId,
  important,
  disabledInput,
  isMyDay,
  disableDelete}) => {
  const noDoneTasks = tasks.filter((el) => !el.done)

  const doneTasks = tasks.filter((el) => el.done)

  const dispatch = useDispatch()

  const ref = useRef(null)

  const refBlock = useRef(null)

  const inputHandler = (event) => {
    return dispatch(changeTitleList({
      id: listId,
      title: event.target.value,
    }))
  }

  const blurInputHandler = (event) => {
    if (event.key === 'Enter') {
      return ref.current.blur()
    }
  }

  const closeRightBarHadnler = (event) => {
    if (event.target === refBlock.current) {
      dispatch(selectTask(null))
    }
  }

  const currentTime = moment().format('LLLL').split(',')[0] + ', ' +
      moment().format('LLLL').split(',')[1]

  useEffect(() => {
    const click = () => {
      dispatch(hideListModal())
      return dispatch(hideModal())
    }

    document.addEventListener('click', click)

    return () => document.removeEventListener('click', click)
  })

  useEffect(() => {
    const onContext = (event) => {
      event.preventDefault()
      if (event.target.id.split('-')[0] === 'item') {
        dispatch(showModal({
          x: event.pageX,
          y: event.pageY - 160,
          id: event.target.id.split('-')[1],
        }))
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
      ref={refBlock}
      onClick={closeRightBarHadnler}
      className="tasks">
      <div className="tasks__header">
        <input
          ref={ref}
          disabled={disabledInput}
          className="tasks__title"
          value={title}
          onChange={inputHandler}
          onKeyPress={blurInputHandler}
        />
        {!disableDelete &&
          <div
            onClick={() => dispatch(showDeleteAlert({
              type: 'list',
              id: listId,
            }))}
            className="tasks__delete">
            <i className="fas fa-trash" />
          </div>
        }
      </div>
      {isMyDay &&
        <div className="tasks__myday">
          {currentTime}
        </div>
      }
      <Field
        isMyDay={isMyDay}
        listId={listId}
        important={important}
        placeholder="Add a task"/>
      <div
        id="tasks"
        className="block">
        {noDoneTasks.map((el, i) => <Item
          listTitle={title}
          showList={showList}
          key={el.id}
          index={i}
          item={el}
          currentList={listId}
          {...el}/>)
        }
        {!!doneTasks.length &&
          <TasksBlock
            tasks={doneTasks}
            showList={showList}
            currentList={listId}
            title="Complited"
          />
        }
      </div>
    </div>
  )
}

Tasks.propTypes = {
  title: PropTypes.string,
  tasks: PropTypes.array,
  showList: PropTypes.bool,
  listId: PropTypes.string.isRequired,
  important: PropTypes.bool,
  disabledInput: PropTypes.bool,
  isMyDay: PropTypes.bool,
  disableDelete: PropTypes.bool,
}

export default Tasks
