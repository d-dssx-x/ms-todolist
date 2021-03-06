import {
  SELECT_TASK,
  SHOW_CALENDAR,
  HIDE_CALENDAR,
  SHOW_MODAL,
  HIDE_MODAL,
  SHOW_LIST_MODAL,
  HIDE_LIST_MODAL,
  SHOW_DELETE_ALERT,
  HIDE_DELETE_ALERT} from '../actions'

const init = {
  selectedTasks: null,
  calendarType: null,
  modal: {
    show: false,
    x: null,
    y: null,
  },
  modalList: {
    show: false,
    top: null,
    left: null,
    bottom: null,
    right: null,
  },
  deleteAlert: {
    show: false,
    type: null,
    id: null,
  },
}

export const systemReducer = (state = init, action) => {
  switch (action.type) {
    case SHOW_DELETE_ALERT:
      return {...state, deleteAlert:
        {show: true, type: action.values.type, id: action.values.id}}
    case HIDE_DELETE_ALERT:
      return {...state, deleteAlert:
      {show: false, type: null, id: null}}
    case HIDE_LIST_MODAL:
      return {...state, modalList: {
        top: null,
        left: null,
        bottom: null,
        right: null,
        show: false}}
    case SHOW_LIST_MODAL:
      return {...state, modalList: {...action.values, show: true}}
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
