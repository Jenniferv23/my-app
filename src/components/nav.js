import React from 'react'
import { Link, useHistory } from 'react-router-dom';
import { auth } from '../firebase'
import { useContext } from 'react'
import { AuthContextUser } from '../context/auth-ctx'

const Nav = () => {
    let history = useHistory()
    const {state, dispatch} = useContext(AuthContextUser);
    console.log(state, dispatch);
    const { user } = state 
    console.log(user, ' que trae mi ñero');

    const logout = () =>{
        auth.signOut()
        dispatch({
            type:'LOGGED_IN_USER',
            payload: null
        })
        history.push('/login')
    }
  
    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
               {user && <Link className="navbar-brand" to="/">Space Transport Solicitud</Link>}
              
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                   {
                        user ?   <li className="nav-item">
                        <button className="btn btn-primary nav-link" onClick={logout}>Cerrar Sesion</button>
                    </li>:null
                    }
                  
                </ul>
            </div>
                        
        </nav>
    </>
    )
}

export default Nav
