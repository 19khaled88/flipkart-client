import { userConstants } from '../actions/constants'

const initState = {
  error: null,
  message: '',
  loading: false,
  success: false,
}

// export default (state = initState, action) => {
//   switch (action.type) {
//     case userConstants.USER_REGISTER_REQUEST:
//       state = {
//         ...state,
//         error: null,
//         loading: true,
//         message: '',
//         success: false,
//       }
//       break
//     case userConstants.USER_REGISTER_SUCCESS:
//       state = {
//         ...state,
//         loading: false,
//         error: null,
//         success: action.payload.success,
//         message: action.payload.user,
//       }
//       break
//     case userConstants.USER_REGISTER_FAILURE:
//       state = {
//         ...state,
//         loading: false,
//         message: '',
//         success: action.payload.success,
//         error: 'User register unsuccessful',
//       }
//     default:
//       state
//   }

//   return state
// }

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case userConstants.USER_REGISTER_REQUEST:
      state = {
        ...state,
        error: null,
        loading: true,
        message: '',
        success: false,
      }
      break
    case userConstants.USER_REGISTER_SUCCESS:
      state = {
        ...state,
        loading: false,
        error: null,
        success: action.payload.success,
        message: action.payload.user,
      }
      break
    case userConstants.USER_REGISTER_FAILURE:
      state = {
        ...state,
        loading: false,
        message: '',
        success: action.payload.success,
        error: 'User register unsuccessful',
      }
      break
    default:
  }

  return state
}
export default userReducer
