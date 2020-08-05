import React from 'react'
import Textarea from 'react-textarea-autosize'
import './index.scss'
import {useSelector, useDispatch} from 'react-redux'
import {
  changeTitleTask,
  switchDoneTask,
  switchImprtntTask,
  showCalendarWin,
  hideCalendar} from '../../redux/actions'
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

export default RightBar
