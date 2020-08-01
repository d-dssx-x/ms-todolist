import {ADD_LIST} from '../actions'

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
    title: 'Add',
    id: 'add',
    type: 'custom',
  },
]


export const listsReducer = (state = init, action) => {
  switch (action.type) {
    case ADD_LIST:
      return [...state,
        {title: action.title, id: Date.now().toString(), type: 'custom'}]
    default:
      return state
  }
}
