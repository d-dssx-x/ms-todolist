/* eslint-disable no-case-declarations */
import {
  ADD_TASK,
  SWITCH_DONE_TASK,
  SWITCH_IMPRTNT_TASK,
  CHANGE_TITLE_TASK,
  SWITCH_TASKS_IN_LIST,
  ADD_REMIND,
  ADD_DUE,
  DELETE_DUE,
  DELETE_REMIND,
  ADD_NOTE,
  ADD_TASK_MYDAY,
  DELETE_TASK,
  ADD_TO_MY_DAY_TASK,
  REMOVE_FROM_MY_DAY_TASK,
  MOVE_TASK_TO_LIST,
  DELETE_TASKS_BY_LISTID,
  ADD_DUE_TODAY,
  ADD_DUE_TOMORROW} from '../actions'

const init = [
  {
    title: 'some 1',
    id: '1',
    done: false,
    important: true,
    listId: 'tasks',
    created: '06/08/2020',
    myday: true,
  },
]

export const tasksReducer = (state = init, action) => {
  switch (action.type) {
    case ADD_DUE_TODAY:
    case ADD_DUE_TOMORROW:
      return state.map((el) => el.id === action.values.id ?
      {...el, due: action.values.due} : el)
    case DELETE_TASKS_BY_LISTID:
      return state.filter((el) => el.listId !== action.listId)
    case MOVE_TASK_TO_LIST:
      return state.map((el) => el.id === action.values.id ?
      {...el, listId: action.values.listId} : el)
    case REMOVE_FROM_MY_DAY_TASK:
      return state.map((el) => el.id === action.id ?
      {...el, myday: false} : el)
    case ADD_TO_MY_DAY_TASK:
      return state.map((el) => el.id === action.id ?
      {...el, myday: true} : el)
    case DELETE_TASK:
      return state.filter((el) => el.id !== action.id)
    case ADD_TASK_MYDAY:
      return [{
        title: action.values.title,
        id: Date.now().toString(),
        done: false,
        listId: 'tasks',
        important: !!action.values.important,
        due: action.values.due,
        created: action.values.created,
        myday: true,
      }, ...state]
    case DELETE_DUE:
      return state.map((el) => el.id === action.id ? {...el, due: null} : el)
    case DELETE_REMIND:
      return state.map((el) => el.id === action.id ? {...el, remind: null} : el)
    case ADD_NOTE:
      return state
          .map((el) => el.id === action.values.id ?
          {...el, note: action.values.note} : el)
    case ADD_DUE:
      return state.map((el) => el.id === action.values.id ?
      {...el, due: action.values.due} : el)
    case ADD_REMIND:
      return state.map((el) => el.id === action.values.id ?
        {...el, remind: action.values.remind} : el)
    case ADD_TASK:
      return [{
        title: action.values.title,
        id: Date.now().toString(),
        done: false,
        listId: action.values.listId,
        important: !!action.values.important,
        created: action.values.created,
      }, ...state]
    case SWITCH_DONE_TASK:
      return state
          .map((el) => el.id === action.id ?
          {...el, done: !el.done} : el)
    case SWITCH_IMPRTNT_TASK:
      return state
          .map((el) => el.id === action.id ?
          {...el, important: !el.important} : el)
    case CHANGE_TITLE_TASK:
      return state
          .map((el) => el.id === action.values.id ?
          {...el, title: action.values.title} : el)
    case SWITCH_TASKS_IN_LIST:
      if (action.values.listId === 'tasks') {
        const item = state[action.values.dragI]
        const hover = state[action.values.hoverI]
        if (item.done !== hover.done) return state
        const newCards = state.filter((el, i) => i !== action.values.dragI)
        newCards.splice(action.values.hoverI, 0, item)
        return [...newCards]
      }
      const currentListTasks = state
          .filter((el) => el.listId === action.values.listId)
      const item = currentListTasks[action.values.dragI]
      const hover = currentListTasks[action.values.hoverI]
      if (item.done !== hover.done) return state
      const otherListsTasks = state
          .filter((el) => el.listId !== action.values.listId)
      const newCards = currentListTasks
          .filter((el, i) => i !== action.values.dragI)
      newCards.splice(action.values.hoverI, 0, item)
      return [...newCards, ...otherListsTasks]
    default:
      return state
  }
}
