import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {useAuth} from '../context/auth-context'

const PrivateRoute = ({component: Component, ...rest }) => {
const { currentUser } = useAuth()

    return (
        <div>
            <Route {...rest} 
            render={props => {
                return currentUser ? <Component {...props}/> : <Redirect to="/login"/>
            }}
            ></Route>
        </div>
    )
}

export default PrivateRoute
