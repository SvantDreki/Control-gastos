import {
    PRESUPUESTO_EXITO, 
    VALIDAR_EXITO,
    VALIDAR_ERROR,
    RESETEAR_PRESUPUESTO
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

export const reiniciarPresupuesto = (presu, valido) => (
    {
        type: RESETEAR_PRESUPUESTO,
        payload: {
            presu,
            valido
        }
    }
)