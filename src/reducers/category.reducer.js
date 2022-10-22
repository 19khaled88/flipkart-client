import { categoryConstants } from '../actions/constants'

const initState = {
  error: null,
  data: '',
  category: [],
  loading: false,
  success: false,
}

// export default (state = initState, action) => {
//   switch (action.type) {
//     case categoryConstants.GET_CATEGORY_REQUEST:
//       state = {
//         ...state,
//         loading: true,
//         error: null,
//         data: '',
//         success: false,
//       }
//       break
//     case categoryConstants.GET_CATEGORY_SUCCESS:
//       state = {
//         ...state,
//         data: action.payload.data,
//         success: true,
//         loading: false,
//         error: null,
//       }
//       break
//     case categoryConstants.GET_CATEGORY_FAILURE:
//       state = {
//         ...state,
//         data: null,
//         loading: false,
//         error: 'Category not found',
//         success: false,
//       }
//       break
//     case categoryConstants.CREATE_CATEGORY_REQUEST:
//       state = {
//         ...state,
//         loading: true,
//         success: false,
//       }
//       break
//     case categoryConstants.CREATE_CATEGORY_SUCCESS:
//       state = {
//         ...state,
//         loading: false,
//         category: action.payload.category,
//         success: true,
//       }
//       break
//     case categoryConstants.CREATE_CATEGORY_FAILURE:
//       state = {
//         ...state,
//         loading: false,
//         success: false,
//         error: action.payload.error,
//       }
//       break
//     default:
//       state
//   }

//   return state
// }

const categoryReducer = (state = initState, action) => {
  switch (action.type) {
    case categoryConstants.GET_CATEGORY_REQUEST:
      state = {
        ...state,
        loading: true,
        error: null,
        data: '',
        success: false,
      }
      break
    case categoryConstants.GET_CATEGORY_SUCCESS:
      state = {
        ...state,
        data: action.payload.data,
        success: true,
        loading: false,
        error: null,
      }
      break
    case categoryConstants.GET_CATEGORY_FAILURE:
      state = {
        ...state,
        data: null,
        loading: false,
        error: 'Category not found',
        success: false,
      }
      break
    case categoryConstants.CREATE_CATEGORY_REQUEST:
      state = {
        ...state,
        loading: true,
        success: false,
      }
      break
    case categoryConstants.CREATE_CATEGORY_SUCCESS:
      state = {
        ...state,
        loading: false,
        category: action.payload.data,
        success: true,
      }
      break
    case categoryConstants.CREATE_CATEGORY_FAILURE:
      state = {
        ...state,
        loading: false,
        success: false,
        error: action.payload.error,
      }
      break
    default:
  }

  return state
}
export default categoryReducer
