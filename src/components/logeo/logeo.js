import React, { useRef, useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../../context/auth-context'
import { Link } from 'react-router-dom'
import { AuthContextUser } from '../../context/auth-ctx'
import './logeo.css'
import Logo from '../../images/Logo.jpeg'


const LoginComponent = () => {
    const [error, setErrror] = useState('')
    const [loading, setLoading] = useState(false)
    const {login, currentUser} = useAuth();
    const history = useHistory()
    const emailRef = useRef();
    const passwordRef = useRef();

  
      // access the context
      const {state, dispatch} = useContext(AuthContextUser);
    console.log(state);
    
    const handelSubmit = async (e) => {
        e.preventDefault()

        try {
            setErrror('')
            setLoading(true)
            const result = await login(emailRef.current.value, passwordRef.current.value);
            const{user} = result;
            const idTokenResult = await user.getIdTokenResult();
            dispatch({
                type:'LOGGED_IN_USER',
                payload:{
                    email:user.emailRef,
                    token: idTokenResult.token
                }
            })
         
            history.push('/')
            console.log(idTokenResult.token);
        } catch (error) {
            setErrror('wrong password')
        }
        setLoading(false)
    };
    console.log(handelSubmit);

    return (
        <>
        <div className="main">
            <div class="Logeo">
                <img className="Logo"
                    src={Logo}
                    alt="Logo Space Transport"/>
                <h1>SPACE TRANSPORT</h1>
                {
                error && <div>{error}</div>
            }
                {
                currentUser && currentUser.email
            }
                <div>
                    <div>
                        <form onSubmit={handelSubmit}
                            className=""
                            style={
                                {minHeight: "30vh"}
                        }>

                            <input className="email-input" placeholder="Email" id="email" type="email"
                                ref={emailRef}
                                /> {/* errors will return when field validation fails  */}
                            <input className="contraseña-input" placeholder="Contraseña" id="password" type="password"
                                ref={passwordRef}
                               />
                            <button disable={loading}
                                type="submit"
                                className="boton-logeo">Login</button>
                            <Link to="/forgot-password">Olvide mi Contraseña</Link>

                            <span>¿No estas registrado?
                                <Link to="/sing-up">
                                    Crear cuenta</Link>
                            </span>
                        </form>

                        <br/>
                        <footer>
                            <div className="footer">
                                <button>
                                    <i className="fab fa-facebook"></i>
                                </button>
                                <button>
                                    <i className="fab fa-twitter-square"></i>
                                </button>
                                <button>
                                    <i className="fab fa-instagram"></i>
                                </button>
                            </div>
                        </footer>

                        
                    </div>
                    
                </div>
            </div>
        </div>

    </>
    )
}

export default LoginComponent