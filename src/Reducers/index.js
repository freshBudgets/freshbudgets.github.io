import { combineReducers } from 'redux'
import user from './user'
import budget from './budget'
import settings from './settings'

export default combineReducers({
  user,
  budget,
  settings
})
