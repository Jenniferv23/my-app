import { useReducer, createContext, useEffect } from 'react';
import { auth } from '../firebase'
//reducer
const firebaseReducer = (state, action) => {
    switch(action.type){
        case "LOGGED_IN_USER":
        return {...state, user: action.payload }
        default: 
        return state
    }
}
//state 
const initialState = {
    user:null
}

// create context

const AuthContextUser = createContext()

// context provider

const AuthProviderUser = ({children}) => {
    const [state, dispatch] = useReducer(firebaseReducer, initialState);
    
    useEffect(() => {
       const unsuscribe = auth.onAuthStateChanged(async user => {
            if(user){
                const idTokenResult = await user.getIdTokenResult();

                dispatch({
                    type:'LOGGED_IN_USER',
                    payload:{email: user.email, token: idTokenResult.token}
                })
            }else{
                dispatch({
                    type:'LOGGED_IN_USER',
                    payload: null
                })
            }
       })
       return ()=> unsuscribe();
    }, [])

    const value = {state, dispatch}
    return <AuthContextUser.Provider value={value}>
       {children} 
    </AuthContextUser.Provider>
}

//export
export {AuthContextUser, AuthProviderUser}