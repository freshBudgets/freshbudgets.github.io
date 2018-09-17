import { combineReducers } from 'redux'
import user from './user'
import budget from './budget'

export default combineReducers({
  user,
  budget
})
