import {createFeature, createReducer, on} from "@ngrx/store"
import {User} from "../models/user.interface"
import * as UsersActions from './users.actions'

export const USERS_FEATURE_KEY = 'users'

export const initialState: User[] = []

export const usersFeature = createFeature({
  name: USERS_FEATURE_KEY,
  reducer: createReducer(
    initialState,
    on(UsersActions.addEditUser, (state, userPayload): User[] => {
      if (userPayload.user.id) {
        return state.map((mapUser: User) => {
          return mapUser.id === userPayload.user.id
            ? {...mapUser, ...userPayload.user}
            : {...mapUser}
        })
      } else {
        return ([
          ...state,
          {...userPayload.user, id: new Date().getTime()}
        ])
      }
    }),
    on(UsersActions.deleteUser, (state, userPayload): User[] => {
      return state.filter(filterUser => {
        return filterUser.id !== userPayload.user.id
      })
    }),
    on(UsersActions.initUsers, (state, usersPayload): User[] => usersPayload.users)
  )
})
