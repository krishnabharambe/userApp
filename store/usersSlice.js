import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  users:{
    id: 0,
    phone:"",
    first_login : false
  },
  isauth:false
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    updateUserInfo: (state, action) => {
          state.users.id = action.payload.id
          state.users.phone = action.payload.phone
          state.users.first_login = action.payload.first_login
      },
      setAuth:(state)=>{
          if(state.users.id != 0){state.isauth = true}
      }
  }
})

export const { updateUserInfo,setAuth } = usersSlice.actions

export default usersSlice.reducer