import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../slice/counter'
import pageNameReducer from '../slice/pagename'
import userReducer from '../slice/user'
import uploadModalReducer from '../slice/uploadModal'
import mediaReducer from '../slice/media'
import error from '../slice/error'
import chat from '../slice/chat'

export const store = configureStore({
  reducer: {
      counter: counterReducer,
      pageName: pageNameReducer,
      user: userReducer,
      uploadModal: uploadModalReducer,
      media: mediaReducer,
      error,
      chat,

  },
})

export default store