import { createSlice } from '@reduxjs/toolkit'

export const error = createSlice({
  name: 'error',
  initialState: {
    visible: false
  },
  reducers: {
    showError(state, action) {
      const { message, title } = action.payload;
      return { ...state, visible:true, message, title }
    },
    hideError() {
      return { visible: false }
    },
  },
})

const actions = {
  ...error.actions,
};

// Action creators are generated for each case reducer function
export { actions } 
  
export default error.reducer