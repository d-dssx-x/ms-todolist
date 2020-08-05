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
  ADD_NOTE} from '../actions'

const init = [
  {
    title: 'some 1',
    id: '1',
    done: false,
    important: true,
    listId: 'tasks',
  },
  {
    title: 'some 2',
    id: '2',
    done: false,
    important: false,
    listId: 'tasks',
  },
  {
    title: 'some 4',
    id: '9',
    done: true,
    listId: 'add',
  },
  {
    title: 'some 4',
    id: '10',
    done: true,
    listId: 'add',
  },
]

export const tasksReducer = (state = init, action) => {
  switch (action.type) {
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
      const currentListTasks = state
          .filter((el) => el.listId === action.values.listId)
      const otherListsTasks = state
          .filter((el) => el.listId !== action.values.listId)
      const item = currentListTasks[action.values.dragI]
      const newCards = currentListTasks
          .filter((el, i) => i !== action.values.dragI)
      newCards.splice(action.values.hoverI, 0, item)
      return [...newCards, ...otherListsTasks]
    default:
      return state
  }
}
