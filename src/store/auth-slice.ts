import { AppDispatch } from './index'
import { RootState } from 'store'
import { User } from 'screens/ProjectList/SearchPanel'
import { createSlice } from '@reduxjs/toolkit'
import * as auth from 'authProvider'
import { bootstrapUser } from 'context/AuthContext'
interface State {
  user: User | null
}
const initialState: State = {
  user: null,
}

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload
    },
  },
})
export const authActions = authSlice.actions
export const selectUser = (state: RootState) => state.auth.user

const { setUser } = authActions

export const login = (form: auth.LoginParam) => (dispatch: AppDispatch) =>
  auth.login(form).then((user) => dispatch(setUser(user)))

export const register = (form: auth.LoginParam) => (dispatch: AppDispatch) =>
  auth.register(form).then((user) => dispatch(setUser(user)))

export const loginout = () => (dispatch: AppDispatch) =>
  auth.loginout().then(() => dispatch(setUser(null)))

export const bootStrap = () => (dispatch: AppDispatch) =>
  bootstrapUser().then((user) => dispatch(setUser(user)))
