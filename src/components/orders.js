import React from 'react'

const Orders = (props) => {
    return (
    <div>
        <div key={props.id} >
          <div className="card">
            <div className="card-body">
              <div className="card-title">
                <h1>Solicitudes de Servicio</h1>
              </div>
              <div className="card-text">
                <h3>numero de solicitud:{props.id}</h3>
                <h3>peso: {props.peso}</h3>
                <h3>cantidad: {props.cantidad}</h3>
                <h3>vehiculo: {props.vehiculo}</h3>
                <h3>origen: {props.origen}</h3>
                <h3>destino: {props.destino}</h3>
                <h3>fecha: {props.fecha}</h3>
                <h3>hora: {props.hora}</h3>
              </div>
            </div>
          </div>
        
        </div> 
        </div>
    )
}

export default Orders
