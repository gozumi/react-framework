import { combineReducers } from 'redux'
import homeReducer from './home'

const rootReducer = combineReducers({
  homeState: homeReducer
})

export default rootReducer
