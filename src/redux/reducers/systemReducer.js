import {SELECT_TASK, SHOW_CALENDAR, HIDE_CALENDAR} from '../actions'

const init = {
  selectedTasks: null,
  calendarType: null,
}

export const systemReducer = (state = init, action) => {
  switch (action.type) {
    case SELECT_TASK:
      return {...state, selectedTasks: action.id}
    case SHOW_CALENDAR:
      return {...state, calendarType: action.calendarType}
    case HIDE_CALENDAR:
      return {...state, calendarType: null}
    default:
      return state
  }
}
