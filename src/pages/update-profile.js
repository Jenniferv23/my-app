import React, {useRef, useState} from 'react'
import {Link, useHistory } from 'react-router-dom'
import { useAuth } from '../context/auth-context'

const UpdateProfile = () => {
    const [error, setErrror] = useState('')
    const [loading, setLoading] = useState(false)
    const { updateEmail, updatePassword, currentUser} = useAuth();
    const history = useHistory()
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    
    const handelSubmit = (e) => {
        e.preventDefault()
        if(passwordRef.current.value !== confirmPasswordRef.current.value){
            return setErrror('Password do not match')
        };
        const promises = []
        setErrror('')
        setLoading(true)
        if(emailRef.current.value !== currentUser.email){
            promises.push(updateEmail(emailRef.current.value))
        }
        if(passwordRef.current.value){
            promises.push(updatePassword(passwordRef.current.value))     
        }
        Promise.all(promises).then(()=> {
            history.push('/')
        }).catch(()=>{
            setErrror('Failed to update the account')
        }).finally(()=>{
            setLoading(false)
        })
    };

    return (
        <div className="container p-5 mt-3">
            <div className="card ">
                <div className="card-body">
                    <h1 className="text-center">Update User</h1>
                    <div className="w-70 mt-2"> 
                    {error && <div>{error}</div>}
                        <form onSubmit={handelSubmit} className="d-flex align-items-center flex-column justify-content-between h-100" style={{minHeight: "30vh"}}>
                        {/* <input placeholder="Name"  ref={nameRef} className="w-100"/>         */}
                            <input placeholder="Email" id="email" type="email" defaultValue={currentUser.email} ref={emailRef} className="w-100"/>
                        {/* errors will return when field validation fails  */}
                            <input placeholder="Leave blank to keep the same" id="password" type="password"  ref={passwordRef} className="w-100" />
                            <input placeholder="Leave blank to keep the same" id="confirm-password"  type="password" ref={confirmPasswordRef} className="w-100" />
                            <button disable={loading ? loading : null} type="submit" className="w-100">Update User</button>
                        </form>
                </div>
            </div>
                <div>
                    <Link to="/">Cancel</Link>
                </div>
            </div>
       </div>
    )
}

export default UpdateProfile
