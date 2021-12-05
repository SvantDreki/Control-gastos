import { useState } from "react";
import Mensaje from "./Mensaje";
import { useDispatch, useSelector } from 'react-redux'

//Redix
import { agregaPresupuesto, validarPresupuesto } from '../actions/presupuesto'

const NuevoPresupuesto = () => {

    const dispatch = useDispatch();

    const setPresupuesto = presu => dispatch( agregaPresupuesto(presu) )
    const setEsValido = validar => dispatch( validarPresupuesto(validar) )

    const { presupuesto } = useSelector( state => state.presupuesto )

    const [mensaje, setMensaje] = useState('')

    const handleSubmit = e => {
        e.preventDefault();

        if (!presupuesto || presupuesto < 0) {
            setMensaje('No es un presupuesto válido');

            return;
        }

        setMensaje('');
        setEsValido(true);
    }


    return (
        <div className="contenedor-presupuesto contenedor sombra">
            <form 
                className="formulario"
                onSubmit={ handleSubmit }
            >
                <div className="campo">
                    <label>Definir Presupuesto</label>

                    <input 
                        className="nuevo-presupuesto"
                        type="number"
                        placeholder="Añade tu Presupuesto"
                        value={presupuesto}
                        onChange={ e => setPresupuesto(Number(e.target.value)) }
                    />
                </div>

                <input 
                    type="submit"
                    value="Añadir"
                />

                { mensaje && <Mensaje tipo="error">{mensaje}</Mensaje> }
            </form>
        </div>
    )
}

export default NuevoPresupuesto
