import {ADD_LIST, CHANGE_TITLE_LIST, DELETE_LIST} from '../actions'

const init = [
  {
    title: 'Tasks',
    id: 'tasks',
    type: 'main',
  },
  {
    title: 'Important',
    id: 'important',
    type: 'main',
  },
  {
    title: 'Your custom',
    id: 'your',
    type: 'custom',
  },
  {
    title: 'My Day',
    id: 'myday',
    type: 'main',
  },
]


export const listsReducer = (state = init, action) => {
  switch (action.type) {
    case DELETE_LIST:
      return state.filter((el) => el.id !== action.id)
    case ADD_LIST:
      return [...state,
        {title: action.title, id: Date.now().toString(), type: 'custom'}]
    case CHANGE_TITLE_LIST:
      return state
          .map((el) => el.id === action.values.id ?
          {...el, title: action.values.title} : el)
    default:
      return state
  }
}
