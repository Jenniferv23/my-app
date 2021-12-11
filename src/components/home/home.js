import {gql} from 'apollo-boost';
import {useQuery, useLazyQuery} from '@apollo/react-hooks';
import "swiper/swiper-bundle.css";
import Nav from '../nav'
import SwiperCore, {EffectCube, Autoplay} from "swiper";
import Orders from '../orders'
import NuevaSolicitudComponent from '../generar-solicitud/generar-solicitud';
import './home.css'

SwiperCore.use([EffectCube, Autoplay]);

const OBTENER_SOLICITUDES = gql `
     { 
      solicitudes{
          _id
          peso
          cantidad
          vehiculo
          origen
          destino
          fecha
          hora
        }
      }
  `


const HomeComponent = () => {
    const {data, loading, error} = useQuery(OBTENER_SOLICITUDES);
    console.log(error, data);
    const [
        fetchSolicitudes, {
            data: solicitudes
        }
    ] = useLazyQuery(OBTENER_SOLICITUDES);
    console.log(solicitudes, fetchSolicitudes);

     if (loading) 
        return <p className="p-5">Loading...</p>

    

    return (
        <div className="main-home">
            <Nav/>
            <div className="content">
                <NuevaSolicitudComponent/>
            <div className="row p-5">

                {
                data ? data.solicitudes.map((orden) => (
                    <Orders id={
                            orden._id
                        }
                        peso={
                            orden.peso
                        }
                        cantidad={
                            orden.cantidad
                        }
                        vehiculo={
                            orden.vehiculo
                        }
                        origen={
                            orden.origen
                        }
                        destino={
                            orden.destino
                        }
                        fecha={
                            orden.fecha
                        }
                        hora={
                            orden.hora
                        }/>
                )) : 'check the DB connection'
            } </div>
            </div>
        </div>
    );
}

export default HomeComponent;
