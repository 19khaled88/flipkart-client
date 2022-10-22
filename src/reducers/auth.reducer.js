import { authConstants } from '../actions/constants'

const initState = {
  token: null,
  user: {
    firstName: '',
    lastName: '',
    role: '',
    email: '',
  },
  authenticate: false,
  authenticating: false,
}

// export default (state = initState, action) => {
//   switch (action.type) {
//     case authConstants.LOGIN_REQUEST:
//       state = {
//         ...state,
//         token: null,
//         user: null,
//         authenticate: false,
//         authenticating: true,
//       }
//       break
//     case authConstants.LOGIN_SUCCESS:
//       state = {
//         ...state,
//         user: action.payload.user,
//         token: action.payload.token,
//         authenticate: true,
//         authenticating: false,
//       }
//       break
//     case authConstants.LOGOUT_REQUEST:
//       state = {
//         ...initState,
//       }
//       break
//     default:
//       state
//   }

//   return state
// }

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case authConstants.LOGIN_REQUEST:
      state = {
        ...state,
        token: null,
        user: null,
        authenticate: false,
        authenticating: true,
      }
      break
    case authConstants.LOGIN_SUCCESS:
      state = {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        authenticate: true,
        authenticating: false,
      }
      break
    case authConstants.LOGOUT_REQUEST:
      state = {
        ...initState,
      }
      break
    default:
  }

  return state
}
export default authReducer
