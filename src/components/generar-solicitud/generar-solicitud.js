import React from 'react';
import gql from 'graphql-tag';
import {toast} from 'react-toastify';
import {useMutation} from '@apollo/react-hooks';
import './generar-solicitud.css'
import Logo from '../../images/Logo.jpeg'

const NUEVA_SOLICITUD = gql `
mutation nuevaSolicitud($peso:String!, $cantidad:String, $vehiculo:String, $origen:String, $destino:String, $fecha:String, $hora:String){
    nuevaSolicitud(input: {peso:$peso, cantidad:$cantidad, vehiculo:$vehiculo, origen:$origen, destino:$destino, fecha:$fecha, hora:$hora }){
        _id
        peso
        cantidad
        vehiculo
        origen
        destino
        fecha
        hora
        }
}`


const NuevaSolicitudComponent = () => {
    let peso, cantidad, vehiculo, origen, destino, fecha, hora;
    const[nuevaSolicitud, {data}] = useMutation(NUEVA_SOLICITUD)
    const SuccessData = data ? data.nuevaSolicitud : null
    console.log(SuccessData, 'my data')
    
const reloadPage =()=>{
    toast.success(`Su requirimiento ha sido recibido por favor recargue la pagina para confirmar este`)
}
    return (
        <div className="formularioSolicitud">
             <img className="formularioSolicitud_Logo"
                    src={Logo}
                    alt="Logo Space Transport"/>
        <h1 className="formularioSolicitud_titulo">Nueva Solicitud</h1>
            <form className="formularioSolicitud_form" onSubmit={e => {
                e.preventDefault();
                nuevaSolicitud({
                  variables:{
                      peso: peso.value, 
                      cantidad: cantidad.value,
                      vehiculo: vehiculo.value,
                      origen: origen.value,
                      destino: destino.value,
                      fecha:fecha.value,
                      hora: hora.value
                  }  
                })
        }}>
                <input className="formularioSolicitud_control" ref={value => peso = value } id="peso" placeholder="Peso"></input>
                <input className="formularioSolicitud_control" ref={value => cantidad = value } id="cantidad" placeholder="Cantidad"></input>
                <input className="formularioSolicitud_control" ref={value => vehiculo = value } id="vehiculo" placeholder="Tipo de Vehiculo"></input>
                <input className="formularioSolicitud_control" ref={value => origen = value } id="origen" placeholder="Origen"></input>
                <input className="formularioSolicitud_control" ref={value => destino = value } id="destino" placeholder="Destino"></input>
                <input className="formularioSolicitud_control" ref={value => fecha = value } id="fecha" placeholder="Fecha"></input>
                <input className="formularioSolicitud_control" ref={value => hora = value } id="hora" placeholder="Hora"></input>
                <button onClick={reloadPage} className="formularioSolicitud_boton" type="submit">Generar</button>
            </form>
            
            {SuccessData ?  <div className="formularioSolicitud_preorden">Verifique su orden:
                <div>{SuccessData._id}</div>
                <div>{SuccessData.peso}</div>
                <div>{SuccessData.cantidad}</div>
                <div>{SuccessData.vehiculo}</div>
                <div>{SuccessData.destino}</div>
                <div>{SuccessData.fecha}</div>
                <div>{SuccessData.hora}</div>
               
                           
                </div> : <div>Por Favor ingrese su orden</div>}
        </div>
    )
}

export default NuevaSolicitudComponent