import React, {useRef, useState} from 'react'
import {useHistory} from 'react-router-dom'
import {useAuth} from '../../context/auth-context'
import {Link} from 'react-router-dom'
import {toast} from 'react-toastify';
import './registro.css'
import Logo from '../../images/Logo.jpeg'
import gql from 'graphql-tag';
import {useMutation} from '@apollo/react-hooks';


const USUARIO_NUEVO = gql `
mutation nuevoUsuario($idNit:String!, $nombre:String!, $celular:String, $direccion:String ){
    nuevoUsuario(input: {idNit:$idNit, nombre:$nombre, celular:$celular, direccion:$direccion}){
        _id
        idNit
        nombre
        celular
        direccion
        
   
        }
}`


const ComponentRegistro = () => {
    let idNit, nombre, celular, direccion;
    const [nuevoUsuario
    ] = useMutation(USUARIO_NUEVO)
   
    const [error, setErrror] = useState('')
    const [loading, setLoading] = useState(false)
    const {singUp, currentUser} = useAuth();
    const history = useHistory()
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    const handelSubmit = async (e) => {
        e.preventDefault()
        nuevoUsuario({
            variables: {
                idNit: idNit.value,
                nombre: nombre.value,
                celular: celular.value,
                direccion: direccion.value,
            }
        })
        if (passwordRef.current.value !== confirmPasswordRef.current.value) {
            return setErrror('Password do not match')
        };
       

        try {
            setErrror('')
            setLoading(true)
            toast.success(`Bienvenido por favor ingrese su requerimiento!!`)
            await singUp(emailRef.current.value, passwordRef.current.value);

            history.push('/')
        } catch (error) {
            setErrror('Failed to create the acccount')
        }
      
        setLoading(false)


    };

    return (
        <div className="main">
            {
            loading ? (
                <h1>Loading....</h1>
            ) : (
                <h1>Register</h1>
            )
        }
            <div className="formularioCliente">
                <img className="Logo"
                    src={Logo}
                    alt="Logo Space Transport"/>
                <div className="title">
                    <h1 className="main_title">SPACE TRANSPORT</h1>
                    <h2 className="second_title">Crear Cuenta</h2>
                    {
                    error && <div>{error}</div>
                }
                    {
                    currentUser && currentUser.email
                }
                    <form onSubmit={handelSubmit}
                    //practicando tailwind
                    className="d-flex align-items-center flex-column justify-content-between h-100"
                        style={
                            {minHeight: "30vh"}
                    }>
                        <input placeholder="Email" id="email" type="email"
                            ref={emailRef}
                            className="control"/> {/* errors will return when field validation fails  */}
                        <input placeholder="Password" id="password" type="password"
                            ref={passwordRef}
                            className="control"/>
                        <input placeholder="Confirm Password" id="confirm-password" type="password"
                            ref={confirmPasswordRef}
                            className="control"/>


                        <input className="control" placeholder="Número de identificación"
                            ref={
                                value => idNit = value
                            }
                            id="idNit"/>
                        <input className="control" placeholder="Nombre completo"
                            ref={
                                value => nombre = value
                            }
                            id="nombre"/>
                        <input className="control" placeholder="Número de célular"
                            ref={
                                value => celular = value
                            }
                            id="celular"/>
                        <input className="control"  placeholder="Dirección"
                            ref={
                                value => direccion = value
                            }
                            id="direccion"/>
                        

                        <button 
                        className="boton-submit"
                            disable={loading}
                            type="submit">Registrarte</button>
                              <Link className="boton-volver-logeo" to="/login">Login</Link>
                    </form>
                  
                </div>
            </div>
           
        </div>
    )
}

export default ComponentRegistro
