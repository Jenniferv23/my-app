import React, {useRef, useState} from 'react'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../context/auth-context'
import { Link } from 'react-router-dom'

const ForgotPassword = () => {
    const [error, setErrror] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const { forgotPassword } = useAuth();
    const history = useHistory()
    const emailRef = useRef();
    
    const handelSubmit = async (e) => {
        e.preventDefault()

        try {
            setMessage('')
            setErrror('') 
            await forgotPassword(emailRef.current.value);
            setMessage('Check your inbox for further instructions')
        } catch (error) {
            setErrror('faild to reset password ')
        }
        setLoading(false)
    };
    console.log(handelSubmit);
    const Anonimous = async ()=>{
        try {
            setErrror('')
            setLoading(true)
            await forgotPassword();
            history.push('/')
        } catch (error) {
            setErrror('unable to login as anonimous')
        }
        setLoading(false)

    }
    return (
      <>
        <div className="w-100 text-center mt-2">
            <h1>Forgot Password</h1>
            {error && <div>{error}</div>}
            {message && <div>{message}</div>}
            <div className="card w-100">
                <div className="card-body">
                <form onSubmit={handelSubmit} className="d-flex align-items-center flex-column justify-content-between h-100" style={{minHeight: "30vh"}}>      
                <input placeholder="Email" id="email" type="email"  ref={emailRef} className="w-100 mt-4"/>
                {/* errors will return when field validation fails  */}
                <button disable={loading} type="submit" className="w-100">Reset Pasword</button>
                <Link to="/login">Back to login</Link>
            </form>
            <div className=""></div>
        <button onClick={Anonimous}>Anonimous</button>
                </div>
            </div>
            
        </div>
      
       </>
    )
}

export default ForgotPassword
