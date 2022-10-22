import axiosBaseUrl from '../utility/url'
import { categoryConstants } from './constants'

export const getAllCategory = () => {
  return async (dispatch) => {
    dispatch({ type: categoryConstants.GET_CATEGORY_REQUEST })
    const response = await axiosBaseUrl.get('/category/find', {})

    if (response.status === 200) {
      const { data } = response
      dispatch({
        type: categoryConstants.GET_CATEGORY_SUCCESS,
        payload: { data },
      })
    }
    if (response.status === 400) {
      dispatch({ type: categoryConstants.GET_CATEGORY_FAILURE })
    }
  }
}

export const createCategory = (data) => {
  return async (dispatch) => {
    dispatch({ type: categoryConstants.CREATE_CATEGORY_REQUEST })
    const response = await axiosBaseUrl.post(`/category/create`, data)
    if (response.status === 200) {
      const { data } = response
      dispatch({
        type: categoryConstants.CREATE_CATEGORY_SUCCESS,
        payload: { category: data.category },
      })
    }
    if (response.status === 400) {
      const { error } = response.data
      dispatch({
        type: categoryConstants.CREATE_CATEGORY_FAILURE,
        payload: error,
      })
    }
  }
}
