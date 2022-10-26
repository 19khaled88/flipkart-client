import { combineReducers } from 'redux'
import authReducer from './auth.reducer'
// import userReducer from './user.reducer'
import categoryReducer from './category.reducer'
import productReducer from './product.reducer'
import productDetailsReducer from './productDetails.reducer'
import userReducer from './user.reducer'
import { userListReducer } from './userList.reducer'

const rootReducer = combineReducers({
  auth: authReducer,
  // user:userReducer,
  user: userReducer,
  category: categoryReducer,
  product: productReducer,
  productDetails: productDetailsReducer,
  userList: userListReducer,
})

export default rootReducer
