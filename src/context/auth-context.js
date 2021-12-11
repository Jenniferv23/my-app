import { createContext, useContext, useState, useEffect} from 'react';
import { auth } from '../firebase'

export const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider =  ({children}) => {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true)
    const singUp = (email, password) => {
       return auth.createUserWithEmailAndPassword(email, password)
    }
    const login =(email, password)=> {
        return auth.signInWithEmailAndPassword(email, password)
    }

    const singUpEmail = (email) => {
        return auth.sendSignInLinkToEmail(email)
    }

    const logOut = () => {
        return auth.signOut()
    }

    const anonimous = () => {
        return auth.signInAnonymously()
    }

    const forgotPassword = (email) => {
        return auth.sendPasswordResetEmail(email);
    }

    const updateEmail = (email) => {
       return currentUser.updateEmail(email)
    }
    const updatePassword = (password) => {
        return currentUser.updatePassword(password)
    }

    useEffect(()=>{
        const unsubscriber = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false) 
        }) 
        return unsubscriber
    }, [])
  
    const value = {
        currentUser,
        singUp,
        login,
        logOut,
        anonimous,
        forgotPassword,
        updateEmail,
        updatePassword,
        singUpEmail
    }

    return <AuthContext.Provider value={value}>
        {!loading && children}
    </AuthContext.Provider>

}

//export 
