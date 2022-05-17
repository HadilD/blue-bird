import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../slice/counter'
import pageNameReducer from '../slice/pagename'
import userReducer from '../slice/user'

export const store = configureStore({
  reducer: {
      counter: counterReducer,
      pageName: pageNameReducer,
      user: userReducer,
  },
})

export default store