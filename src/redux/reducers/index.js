import {combineReducers} from 'redux'
import {tasksReducer} from './tasksReducer'
import {listsReducer} from './listsReducer'
import {systemReducer} from './systemReducer'

export const rootReducer = combineReducers({
  tasks: tasksReducer,
  lists: listsReducer,
  system: systemReducer,
})
