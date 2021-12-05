import React from 'react'
import Gasto from './Gasto'
import { useDispatch, useSelector } from 'react-redux'

//Redux
import { agregarGasto } from '../actions/gastos'

const ListadoGastos = ({ setGastoEditar, eliminarGastos, filtro }) => {

    const dispatch = useDispatch()

    const { gastos } = useSelector( state => state.gastos )
    const { gastoFil } = useSelector( state => state.gastos )

    return (
        <div className="listado-gastos contenedor">
            

            { filtro ? (
                <>
                    <h2>{ gastoFil.length ? 'Gastos' : 'No hay gastos en esta categoria' }</h2>
                    {gastoFil.map( gasto => (
                        <Gasto 
                            key={gasto.id} 
                            gasto={gasto}
                            setGastoEditar={setGastoEditar} 
                            eliminarGastos={eliminarGastos}
                        />
                    ) )}
                </>
            ) : (
                <>
                    <h2>{ gastos.length ? 'Gastos' : 'No hay gastos aún' }</h2>
                    {gastos.map( gasto => (
                        <Gasto 
                            key={gasto.id} 
                            gasto={gasto}
                            setGastoEditar={setGastoEditar} 
                            eliminarGastos={eliminarGastos}
                        />
                    ) )}
                </>
            ) }
        </div>
    )
}

export default ListadoGastos
