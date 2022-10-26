import { productDetailsConstants } from "../actions/constants";

const initState ={
    error:'',
    loading: false,
    data:'',
    success: false,
}

const productDetailsReducer =(state = initState, action)=>{
    switch(action.type){
        case productDetailsConstants.SHOW_PRODUCT_DETAILS_REQUEST:
            state ={
                ...state,
                success:false,
                loading:true
            }
            break
        case productDetailsConstants.SHOW_PRODUCT_DETAILS_SUCCESS:
            state={
                ...state,
                success:true,
                loading:false,
                data:action.payload.data
            }
            break
        case productDetailsConstants.SHOW_PRODUCT_DETAILS_FAILURE:
            state={
                ...state,
                success:false,
                loading:false,
                data:null,
                error:action.payload
            }
    }
  
    return state
}

export default productDetailsReducer