import { SIGNIN, SIGNOUT } from "../auth/AuthAction";

const initialState = {
    isAuth:false,
    user:{}
};



const authReducer = (state = initialState, action)=>{
    switch(action.type){
        case SIGNIN:
            return{
                ...state,
                isAuth:true,
                user:action.payload,

            };
            case SIGNOUT:
                return{
                    ...state,
                    isAuth:false,
                    user:{},
                };
                default:
                    return state;

    }
};


export default authReducer