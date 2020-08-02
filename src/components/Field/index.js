import React, {useState, useRef, useEffect} from 'react'
import PropTypes from 'prop-types'
import './index.scss'
import {useDispatch} from 'react-redux'
import {addTask} from '../../redux/actions'

const Field = ({listId, important}) => {
  const ref = useRef(null)
  const [active, setActive] = useState(true)
  const classes = active ? 'field_active' : ''
  const [taskTitle, setTaskTitle] = useState('')
  const dispatch = useDispatch()

  const pressActiveHandler = () => {
    return setActive(true)
  }

  useEffect(() => {
    if (active) {
      ref.current.focus()
    }
  }, [active])

  useEffect(() => {
    const click = (event) => {
      if (event.target.id.split('-')[0] === 'field') {
        return
      }
      setActive(false)
    }
    document.addEventListener('click', click)

    return () => {
      document.removeEventListener('click', click)
    }
  }, [])

  const inputHandler = (event) => {
    return setTaskTitle(event.target.value)
  }

  const onKeyPressHandler = (event) => {
    if (event.key === 'Enter' && taskTitle.trim() !== '') {
      dispatch(addTask({
        title: taskTitle,
        listId,
        important,
      }))
      setTaskTitle('')
    }
  }

  return (
    <div
      id="field"
      onClick={pressActiveHandler}
      className={`field ${classes}`}>
      {!active &&
      <>
        <div
          id="field-icon"
          className="field__icon">
          <i className="fas fa-plus"/>
        </div>
        <div
          id="field-desc"
          className="field__desc">
          Add a task
        </div>
      </>}
      {active &&
      <>
        <div className="field__circle" />
        <input
          onKeyPress={onKeyPressHandler}
          onChange={inputHandler}
          value={taskTitle}
          ref={ref}
          id="input-field"
          className="field__input"
          placeholder="Add a task"/>
      </>}
    </div>
  )
}

Field.propTypes = {
  listId: PropTypes.string.isRequired,
  important: PropTypes.bool,
}

export default Field
