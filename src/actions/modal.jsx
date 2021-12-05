import {
    ACTIVAR_MODAL,
    DESACTIVAR_MODAL,
    ANIMAR_MODAL
} from '../types'

export const activarModal = activar => {
    if( activar ) {
        return {
            type: ACTIVAR_MODAL,
            payload: activar
        }
    } else {
        return {
            type: DESACTIVAR_MODAL,
            payload: activar
        }
    }
}

export const animarModalAction = accion => (
    {
        type: ANIMAR_MODAL,
        payload: accion
    }
)