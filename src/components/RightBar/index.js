import React, {useState, useEffect} from 'react'
import Textarea from 'react-textarea-autosize'
import './index.scss'
import {useSelector, useDispatch} from 'react-redux'
import {
  changeTitleTask,
  switchDoneTask,
  switchImprtntTask,
  showCalendarWin,
  hideCalendar,
  deleteDue,
  deleteRemind,
  addNote,
  selectTask,
  showDeleteAlert} from '../../redux/actions'
import PropTypes from 'prop-types'
import Calendar from '../Calendar'
import moment from 'moment'


const RightBar = ({id}) => {
  const {title, done, important} = useSelector((state) => state.tasks)
      .find((el) => el.id === id)

  const classDone = done ? 'right-bar__circle_done': ''

  const classImprtnt = important ? 'right-bar__icon_imprt' : ''

  const dispatch = useDispatch()

  const textareaHandler = (event) => {
    return dispatch(changeTitleTask({
      id,
      title: event.target.value,
    }))
  }

  const onPressDoneHandler = () => {
    return dispatch(switchDoneTask(id))
  }

  const importantHandler = () => {
    return dispatch(switchImprtntTask(id))
  }

  return (
    <div
      onClick={() => dispatch(hideCalendar())}
      className="right-bar">
      <div className="right-bar__inner">
        <div className="right-bar__tasks-wrapper">
          <div
            role="button"
            onClick={onPressDoneHandler}
            className={`right-bar__circle ${classDone}`}/>
          <Textarea
            maxRows={5}
            minRows={1}
            className="right-bar__title"
            value={title}
            onChange={textareaHandler}
          />
          <div
            role="button"
            onClick={importantHandler}
            className={`right-bar__icon ${classImprtnt}`}>
            {!important &&
            <i className="far fa-star"/>
            }
            {important &&
            <i className="fas fa-star"/>
            }
          </div>
        </div>
        <div className="right-bar__list-item">
          <Remind id={id} />
          <Due id={id} />
          <Note id={id}/>
          <Footer id={id}/>
        </div>
      </div>
    </div>
  )
}

RightBar.propTypes = {
  id: PropTypes.string.isRequired,
}


const Remind = ({id}) => {
  const showCalendar = useSelector((state) => state.system).calendarType
  const dispatch = useDispatch()

  const time = useSelector((state) => state.tasks)
      .find((el) => el.id === id).remind

  const iconClass = time ? 'remind__icon_remind' : ''

  const showCalendarHandler = (event) => {
    event.stopPropagation()
    return dispatch(showCalendarWin('remind'))
  }

  const deleteRemindHandler = (event) => {
    event.stopPropagation()
    return dispatch(deleteRemind(id))
  }

  return (
    <div
      onClick={showCalendarHandler}
      className="remind-wrapper">
      <div className="remind">
        <div className={`remind__icon ${iconClass}`}>
          <i className="far fa-bell"/>
        </div>
        {!time &&
          <div className="remind__title">
            Remind me
          </div>}
        {time &&
          <div className="remind__show">
            <div className="remind__show-time">
              Remind me at {time.split('|')[1]}
            </div>
            <div className="remind__show-day">
              {moment(time.split('|')[0]).format('llll').split(',')[0]},
              {moment(time.split('|')[0]).format('llll').split(',')[1]}
            </div>
            <div
              onClick={deleteRemindHandler}
              className="remind__icon-times">
              <i className="fas fa-times"/>
            </div>
          </div>
        }
      </div>
      {showCalendar === 'remind' &&
        <Calendar
          title={'Remind'}
          id={id}
          type="remind"
          isTime/>
      }
    </div>
  )
}

Remind.propTypes = {
  id: PropTypes.string.isRequired,
}

const Due = ({id}) => {
  const showCalendar = useSelector((state) => state.system).calendarType
  const due = useSelector((state) => state.tasks).find((el) => el.id === id).due
  const dispatch = useDispatch()
  const overDue = moment().format('L') > moment(due).format('L')

  const classes = due ? 'due_active' : ''

  const classIcon = overDue ? 'due__show_over' : ''

  const showCalendarHandler = (event) => {
    event.stopPropagation()
    return dispatch(showCalendarWin('due'))
  }

  const deleteDueHandler = (event) => {
    event.stopPropagation()
    return dispatch(deleteDue(id))
  }
  const calendarOption = {
    lastDay: '[Yesterday]',
    sameDay: '[Today]',
    nextDay: '[Tomorrow]',
    lastWeek: '[last] dddd',
    nextWeek: 'dddd',
    sameElse: 'L',
  }
  return (
    <div
      onClick={showCalendarHandler}
      className="due-wrapper">
      <div className="due">
        <div className={`due__icon ${classes} ${classIcon}`}>
          <i className="far fa-calendar-alt"/>
        </div>
        {!due &&
          <div className="due__title">
            Add due date
          </div>
        }
        {due &&
          <>
            {!overDue &&
              <div className={`due__show ${classes}`}>
              Due {moment(due).calendar(null, calendarOption)}
                <div
                  onClick={deleteDueHandler}
                  className="due__icon-times">
                  <i className="fas fa-times"/>
                </div>
              </div>
            }
            {
              <div className={`due__show due__show_over`}>
              Overdue {moment(due).calendar(null, calendarOption)}
                <div
                  onClick={deleteDueHandler}
                  className="due__icon-times">
                  <i className="fas fa-times"/>
                </div>
              </div>
            }
          </>
        }
      </div>
      {showCalendar === 'due' &&
        <Calendar
          title={'Due'}
          id={id}
          type="due"
        />
      }
    </div>
  )
}

Due.propTypes = {
  id: PropTypes.string.isRequired,
}

const Note = ({id}) => {
  const task = useSelector((state) => state.tasks).filter((el) => el.id === id)
  const dispatch = useDispatch()
  const onChangeHandler = (event) => {
    return dispatch(addNote({
      id,
      note: event.target.value.trim(),
    }))
  }

  return (
    <div className="note-wrapper">
      <Textarea
        onChange={onChangeHandler}
        value={task.note}
        maxRows={15}
        className="note__textarea"
        placeholder="Add note"/>
    </div>
  )
}

Note.propTypes = {
  id: PropTypes.string.isRequired,
}

const Footer = ({id}) => {
  const dispatch = useDispatch()
  const task = useSelector((state) => state.tasks).find((el) => el.id === id)
  const [title, setTitle] = useState('')

  const deleteTaskHandler = () => {
    return dispatch(showDeleteAlert({
      type: 'task',
      id,
    }))
  }

  useEffect(() => {
    if (moment(task.created).format('L') === moment().format('L')) {
      return setTitle('Created Today')
    } else {
      setTitle(`Created on ${moment(task.created).calendar()}`)
    }
  }, [])
  return (
    <div className="footer-bar">
      <div
        role="button"
        onClick={() => dispatch(selectTask(null))}
        className="footer-bar__icon">
        <i className="fas fa-times"/>
      </div>
      <div className="footer-bar__title">
        {title}
      </div>
      <div
        role="button"
        onClick={deleteTaskHandler}
        className="footer-bar__icon">
        <i className="fas fa-trash"/>
      </div>
    </div>
  )
}

Footer.propTypes = {
  id: PropTypes.string.isRequired,
}

export default RightBar
