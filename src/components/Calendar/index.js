import React, {useState} from 'react'
import './index.scss'
import moment from 'moment'
import {useDispatch, useSelector} from 'react-redux'
import {addRemind, hideCalendar} from '../../redux/actions'
import PropTypes from 'prop-types'

const Calendar = ({id, title, type, isTime}) => {
  const dispatch = useDispatch()
  const task = useSelector((state) => state.tasks).find((el) => el.id === id)
  const [targetMonth, setTargetMonth] = useState(0)

  const dateTitle = moment().add(targetMonth, 'month').format('MMMM YYYY')

  const totalDay = moment().add(targetMonth, 'month').daysInMonth()

  const [selectedDay, setSelectedDay] = useState(task.remind)

  const arr = new Array(totalDay).fill(0).map((el, i) => el = i + 1)

  const currentDay = moment().format('L')

  const [timeSet, setTimeSet] = useState({
    hours: moment().format('hh'),
    minutes: moment().format('mm'),
  })

  const j = moment().format('D') - 1

  const onPressToolUpBtn = () => {
    return setTargetMonth(targetMonth + 1)
  }
  const onPressToolDownBtn = () => {
    return setTargetMonth(targetMonth - 1)
  }

  const selectedHandler = (day) => {
    return setSelectedDay(day)
  }

  const saveHandler = () => {
    if (type === 'remind' && selectedDay) {
      dispatch(addRemind({
        id,
        remind: selectedDay + '|' + timeSet.hours + ':' + timeSet.minutes,
      }))
      return dispatch(hideCalendar())
    }
  }

  const onChangeHandler = (event) => {
    if (event.target.value.match(/\D+/g)) {
      return
    }
    if (event.target.name === 'hours') {
      if (Number(event.target.value) > 23 ||
        event.target.value.length > 2) return

      return setTimeSet({...timeSet, hours: event.target.value})
    }
    if (event.target.name === 'minutes') {
      if (Number(event.target.value) > 59 ||
        event.target.value.length > 2) return

      return setTimeSet({...timeSet, minutes: event.target.value})
    }
  }
  return (
    <div
      onClick={(event)=>event.stopPropagation()}
      className="calendar">
      <div className="calendar__title">{title}</div>
      <div className="calendar__tool">
        <div className="calendar__month">
          {dateTitle}
        </div>
        <div className="calendar__buttons">
          <div
            role="button"
            onClick={onPressToolUpBtn}
            className="calendar__button">
            <i className="fas fa-arrow-up"></i>
          </div>
          <div
            role="button"
            onClick={onPressToolDownBtn}
            className="calendar__button">
            <i className="fas fa-arrow-down"></i>
          </div>
        </div>
      </div>
      <div className="calendar__days">
        {arr.map((el, i) => <Day
          day={moment().add(targetMonth, 'month').add(i - j, 'day').format('L')}
          currentDay={currentDay}
          selected={selectedDay}
          key={i}
          onClick={selectedHandler}
        />)}
      </div>
      {isTime &&
        <div className="calendar__time-sel">
          <input
            className="calendar__input"
            name="hours"
            value={timeSet.hours}
            onChange={onChangeHandler}/>
            :
          <input
            className="calendar__input"
            name="minutes"
            value={timeSet.minutes}
            onChange={onChangeHandler}/>
        </div>
      }
      <button
        onClick={saveHandler}
        className="calendar__save">
        Save
      </button>
    </div>
  )
}

Calendar.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  isTime: PropTypes.bool,
}

const Day = ({currentDay, selected, day, onClick}) => {
  const classCurrent = currentDay === day ?
      'calendar__day-wrapper_current' : ''
  const selectedFromat = selected ? selected.split('|')[0] : ''
  const classSelected = selectedFromat === day ? 'calendar__day_selected' : ''

  const number = Number(day.split('/')[1])

  return (
    <button
      onClick={() => onClick(day)}
      className={`calendar__day ${classSelected}`}>
      <div className={`calendar__day-wrapper ${classCurrent}`}>
        {number}
      </div>
    </button>
  )
}

Day.propTypes = {
  currentDay: PropTypes.string.isRequired,
  selected: PropTypes.string,
  day: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default Calendar
