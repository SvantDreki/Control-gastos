import {
    ACTIVAR_MODAL,
    DESACTIVAR_MODAL,
    ANIMAR_MODAL
} from '../types'

const inicialState = {
    activo: false,  // es modal
    animarModal: false // es animar modal
}

const modalReducer = ( state = inicialState, action ) => {
    switch (action.type) {
        case ACTIVAR_MODAL:
        case DESACTIVAR_MODAL:
            return {
                ...state,
                activo: action.payload
            }
        case ANIMAR_MODAL: 
            return {
                ...state,
                animarModal: action.payload
            }
        default:
            return state;
    }
}

export default modalReducer;