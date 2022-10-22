import { productConstants } from '../actions/constants'

const initState = {
  error: null,
  product: {
    name: '',
    slug: '',
    price: '',
    quantity: '',
    description: '',
    offer: '',
    category: '',
    createdBy: '',
    productPicture: '',
  },
  loading: false,
  success: false,
}

const productReducer = (state = initState, action) => {
  switch (action.type) {
    case productConstants.GET_PRODUCT_REQUEST:
      state = {
        ...state,
      }
      break
    case productConstants.GET_PRODUCT_SUCCESS:
      state = {
        ...state,
        product: action.payload,
      }
      break
    case productConstants.GET_PRODUCT_FAILURE:
      state = {
        ...state,
      }
      break
    default:
  }

  return state
}

export default productReducer
