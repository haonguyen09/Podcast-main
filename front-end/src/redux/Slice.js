import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    access_token: ''
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      console.log("state", state, action)
          const { access_token, firstName, lastName, email } = action.payload
          console.log('action', action.payload)
          state.firstName = firstName
          state.lastName = lastName
          state.email = email
          state.access_token = access_token
      },
      resetUser: (state) => {
          state.firstName = ''
          state.lastName = ''
          state.email = ''
          state.access_token = ''
      }
  }
})

export const { updateUser, resetUser } = userSlice.actions 

export default userSlice.reducer