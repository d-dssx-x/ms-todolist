import {ADD_TASK, SWITCH_DONE_TASK, SWITCH_IMPRTNT_TASK} from '../actions'

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
          .map((el) => el.id === action.values.id ?
          {...el, done: action.values.done} : el)
    case SWITCH_IMPRTNT_TASK:
      return state
          .map((el) => el.id === action.values.id ?
          {...el, important: action.values.important} : el)
    default:
      return state
  }
}
