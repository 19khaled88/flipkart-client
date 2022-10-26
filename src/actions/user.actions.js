import axiosBaseUrl from '../utility/url'
import { userListConstants } from './constants'

export const userList = () => {
  return async (dispatch) => {
    dispatch({ type: userListConstants.LIST_USER_REQUEST })
    const response = await axiosBaseUrl.get(`/userList`)
    console.log(response)
    if (response.status === 200) {
      const { data } = response
      dispatch({
        type: userListConstants.LIST_USER_SUCCESS,
        payload: data,
      })
    }
    if (response.status === 400) {
      dispatch({
        type: userListConstants.LIST_USER_FAILURE,
        payload: 'No users found',
      })
    }
  }
}
