//redux
//inistial state
const initialState = {
    popup : false,
    isLogin : false,
    isLoading : false,
    loadingContent: true,
    status: null,
    user : {},
    notes : {},
    count : 0
    }
  //reducer (kumpulan instruksi) yang kirimkan oleh dispatch
const reducer = ( state=initialState , action ) => {
    switch(action.type){
        case 'CHANGE_POPUP':
        return {
            ...state,//copy semua state
            popup : action.value
        }
        case 'CHANGE_ISLOGIN' :
        return {
            ...state,
            isLogin : action.value
        }
        case 'CHANGE_USER' :
            return {
                ...state,
                user : action.value
            }
        case 'CHANGE_LOADING' :
            return {
                ...state,
                isLoading : action.value
            }
        case 'CHANGE_STATUS' :
            return {
                ...state,
                status : action.value
            }
        case 'SET_NOTES' :
            return {
                ...state,
                notes : action.value
            }
        case 'LOADING_CONTENT' :
            return{
                ...state,
                loadingContent: action.value
            }
        case 'UPDATE_COUNT': {
           return{
            ...state,
            count: state.count + action.value
           }

        }
        case 'UPDATE_MIN': {
            return{
                ...state,
                count: state.count - action.value
            }
        }
        default : return state;
    }
}
// ini akan di import di halaman store
export default reducer;