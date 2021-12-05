import { useEffect, useState } from "react"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { useDispatch, useSelector } from 'react-redux'

//Redix
import { agregaPresupuesto, validarPresupuesto } from '../actions/presupuesto'
import { agregarGasto } from '../actions/gastos'

const ControlPresupuesto = () => {

    const [disponible, setDisponible] = useState(0);
    const [gastado, setGastado] = useState(0);
    const [porcentaje, setPorcentaje] = useState(0);

    const dispatch = useDispatch();

    const setPresupuesto = presu => dispatch( agregaPresupuesto(presu) ) 
    const setEsValido = validar => dispatch( validarPresupuesto(validar) )
    const setGastos = gasto => dispatch( agregarGasto(gasto) )

    const { presupuesto } = useSelector( state => state.presupuesto )
    const { gastos } = useSelector( state => state.gastos )

    useEffect(() => {
        const totalGastado = gastos.reduce( (total, gasto) => Number(gasto.cantidad) + total, 0 );

        const totalDisponible = presupuesto - totalGastado;
        
        const nuevoPorcentaje =  Math.round( ( (presupuesto - totalDisponible) / presupuesto ) * 100 );
        
        setGastado(totalGastado);
        setDisponible(totalDisponible);

        setTimeout( () => {
            setPorcentaje(nuevoPorcentaje)
        }, 1000 )
        
    }, [gastos])

    const formatiarCantidad = cantidad => {
        return cantidad.toLocaleString('es-CL', {
            style: 'currency',
            currency: 'CLP'
        })
    }

    const handleResetApp = () => {
        const result = confirm('¿Deseas reiniciar presupuesto y gastos?');

        if(result) {
            setPresupuesto(0)
            setGastos([])
            setEsValido(false)
        }
    }

    const opcionesBarra = {
        pathColor: porcentaje > 100 ? '#dc2626' : '#3b82f6',
        trailColor: '#d1d1d1',
        textColor: '#3b82f6'
    };

    return (
        <div className="contenedor-presupuesto contenedor sombra dos-columnas">
            <div>
                <CircularProgressbar 
                    value={porcentaje}
                    text={ `${porcentaje}% Gastado` }
                    styles={ buildStyles( opcionesBarra ) }
                />   
            </div>
            <div className="contenido-presupuesto">
                <button
                    className="reset-app"
                    type="button"
                    onClick={handleResetApp}
                >
                    Resetear App
                </button>
                <p>
                    <span>Presupuesto:</span> {formatiarCantidad(presupuesto)}
                </p>

                <p className={`${disponible < 0 ? 'negativo' : ''}`}>
                    <span>Disponible:</span> {formatiarCantidad(disponible)}
                </p>

                <p>
                    <span>Gastada:</span> {formatiarCantidad(gastado)}
                </p>
            </div>
        </div>
    )
}

export default ControlPresupuesto
