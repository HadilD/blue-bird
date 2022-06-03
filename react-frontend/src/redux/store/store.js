import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../slice/counter'
import pageNameReducer from '../slice/pagename'
import userReducer from '../slice/user'
import uploadModalReducer from '../slice/uploadModal'

export const store = configureStore({
  reducer: {
      counter: counterReducer,
      pageName: pageNameReducer,
      user: userReducer,
      uploadModal: uploadModalReducer,
  },
})

export default store