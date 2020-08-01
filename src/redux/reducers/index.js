import {combineReducers} from 'redux'
import {tasksReducer} from './tasksReducer'
import {listsReducer} from './listsReducer'

export const rootReducer = combineReducers({
  tasks: tasksReducer,
  lists: listsReducer,
})
