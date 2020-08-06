import {
  SELECT_TASK,
  SHOW_CALENDAR,
  HIDE_CALENDAR,
  SHOW_MODAL,
  HIDE_MODAL} from '../actions'

const init = {
  selectedTasks: null,
  calendarType: null,
  modal: {
    show: false,
    x: null,
    y: null,
  },
}

export const systemReducer = (state = init, action) => {
  switch (action.type) {
    case SHOW_MODAL:
      return {...state, modal: {
        show: true,
        x: action.values.x,
        y: action.values.y,
        id: action.values.id,
      }}
    case HIDE_MODAL:
      return {...state, modal: {
        show: false,
        x: null,
        y: null,
        id: null,
      }}
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
