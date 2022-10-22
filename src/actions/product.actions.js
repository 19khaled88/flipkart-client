import axiosBaseUrl from '../utility/url'
import { productConstants } from './constants'

export const addProduct = (formData, headers) => {
  return async (dispatch) => {
    dispatch({ type: productConstants.CREATE_PRODUCT_REQUEST })
    // for (let dt of formData) {
    //   for (let l of dt) {
    //     if (typeof l === 'object') {
    //       console.log(l.name)
    //     }
    //   }
    // }
    // const response = await axiosBaseUrl.post(`/product/create`, formData, {
    //   headers: headers,
    // })
    const response = await axiosBaseUrl.post(`/product/create`, formData)
    // console.log(response)
  }
}

export const getProduct = () => {
  return async (dispatch) => {
    dispatch({ type: productConstants.GET_PRODUCT_REQUEST })
    const response = await axiosBaseUrl.get('/product/find')

    if (response.status === 200) {
      const { getProduct } = response.data
      dispatch({
        type: productConstants.GET_PRODUCT_SUCCESS,
        payload: response.data,
      })
    }
    if (response.status === 400) {
      dispatch({ type: productConstants.GET_PRODUCT_FAILURE })
    }
  }
}
