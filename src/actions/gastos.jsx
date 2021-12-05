import {
    AGREGAR_GASTO,
    EDITAR_GASTO,
    ELIMNAR_GASTO,
    FILTRAR_GASTOS
} from '../types'

export const agregarGasto = gasto => (
    {
        type: AGREGAR_GASTO,
        payload: gasto
    }
)

export const filtrarGastos = gastosFil => (
    {
        type: FILTRAR_GASTOS,
        payload: gastosFil
    }
)

export const editarGastos = gasto => (
    {
        type: EDITAR_GASTO,
        payload: gasto
    }
)

export const eliminarGastoAction = gastos => (
    {
        type: ELIMNAR_GASTO,
        payload: gastos
    }
)