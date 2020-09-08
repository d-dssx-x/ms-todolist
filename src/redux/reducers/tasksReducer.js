/* eslint-disable no-case-declarations */
import {
  ADD_TASK,
  SWITCH_TASKS_IN_LIST,
  DELETE_TASK,
  MOVE_TASK_TO_LIST,
  DELETE_TASKS_BY_LISTID,
  PATCH_TASK,
  FETCH_TASKS,
} from '../actions'

const init = []

export const tasksReducer = (state = init, action) => {
  switch (action.type) {
    case DELETE_TASKS_BY_LISTID:
      return state.filter((el) => el.listId !== action.listId)
    case MOVE_TASK_TO_LIST:
      return state.map((el) => el.id === action.values.id ?
      {...el, listId: action.values.listId} : el)
    case DELETE_TASK:
      return [...action.tasks]
    case ADD_TASK:
      return [action.task, ...state]
    case PATCH_TASK:
      return state.map((el) => el.id === action.task.id ? action.task : el)
    case FETCH_TASKS:
      return [...action.tasks]
    // Fixme
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
