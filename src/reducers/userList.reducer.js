import { userListConstants } from '../actions/constants'

const initState = {
  error: null,
  users: '',
  loading: false,
  success: false,
}

export const userListReducer = (state = initState, action) => {
  switch (action.type) {
    case userListConstants.LIST_USER_REQUEST:
      state = {
        ...state,
        loading: true,
        success: false,
        error: null,
        users: '',
      }
      break
    case userListConstants.LIST_USER_SUCCESS:
      state = {
        ...state,
        loading: false,
        error: null,
        success: true,
        users: action.payload.data,
      }
      break
    case userListConstants.LIST_USER_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
        users: '',
      }
      break
    default:
  }
  return state
}
