import {
    PRESUPUESTO_EXITO,
    PRESUPUESTO_ERROR,
    VALIDAR_EXITO,
    VALIDAR_ERROR
} from '../types'

const inicialState = {
    presupuesto: 0,
    esValido: false
}

const presupuestoReducer = ( state = inicialState, action ) => {
    switch (action.type) {
        case PRESUPUESTO_EXITO:
            return {
                ...state,
                presupuesto: action.payload,
            }
        case PRESUPUESTO_ERROR:
            return {
                ...state,
                presupuesto: 0
            }
        case VALIDAR_EXITO:
        case VALIDAR_ERROR:
            return {
                ...state,
                esValido: action.payload
            }
        default:
            return state;
    }
}

export default presupuestoReducer;