import {
    PRESUPUESTO_EXITO, 
    PRESUPUESTO_ERROR,
    VALIDAR_EXITO,
    VALIDAR_ERROR
} from '../types'

export const agregaPresupuesto = presupuesto => (
    {
        type: PRESUPUESTO_EXITO,
        payload: presupuesto
    }
)

export const validarPresupuesto = validar => {
    if(validar) {
        return {
            type: VALIDAR_EXITO,
            payload: validar
        }
    } else {
        return {
            type: VALIDAR_ERROR,
            payload: validar
        }
    }
}