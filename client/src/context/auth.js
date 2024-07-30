import React, {useReducer, createContext, useState} from 'react'
import {jwtDecode} from 'jwt-decode'

const initialState = {
    user: null
}

if(localStorage.getItem('jwtToken')){
    const decodedToken = jwtDecode(localStorage.getItem('jwtToken'))

    if(decodedToken.exp * 2000 < Date.now()){
        localStorage.removeItem('jwtToken')
    }else{
        initialState.user = decodedToken;
    }
}

const AuthContext = createContext({
    user: null,
    login: (userData) => {},
    logout: () => {}
})

function authReducer(state, action){
    switch(action.type){
        case 'LOGIN':
            console.log(localStorage.getItem('jwtToken'))
            console.log(state.user)
            return{
                ...state,
                user: action.payload
            }
        case 'LOGOUT':
            return{
                ...state,
                user: null
            }
        default:
            return state;
    }
}

function AuthProvider(props){
    const [state, dispatch] = useReducer(authReducer, initialState);
    const [bio, updateBio] = useState('')

    function login(userData){
        localStorage.setItem("jwtToken", userData.token)
        dispatch({
            type: 'LOGIN',
            payload: userData
        })
        updateBio("")
    }

    function logout(){
        localStorage.removeItem("jwtToken")
        dispatch({
            type: 'LOGOUT'
        })
        //no payload
        updateBio("")
    }
    
    

    return (
        <AuthContext.Provider
            value = {{ user: state.user, login, logout, bio, updateBio}}
            {...props}
            />
    )
}

export {AuthContext, AuthProvider}