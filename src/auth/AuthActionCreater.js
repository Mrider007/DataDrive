import * as types from "../auth/AuthAction"

const logInUser = (payload)=>{

    return {
        type: types.SIGNIN,
        payload
    };
}

const logOutUser =()=>{
    return {
        type: types.SIGNOUT
    }
}


//action creater
export const signInUser = (email,password) =>(dispatch) =>{
console.log(email,password)
}

export const createUser = (name,email,password) =>(dispatch) =>{

}

export const signOutUser = () => (dispatch) =>{
    dispatch(logOutUser())
}