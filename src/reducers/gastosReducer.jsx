import {
    AGREGAR_GASTO,
    EDITAR_GASTO,
    ELIMNAR_GASTO,
    FILTRAR_GASTOS
} from '../types'

const inicialState = {
    gastos: [],
    gastoEditar: {},
    gastoFil: []
}

const gastosReducer = ( state = inicialState, action ) => {
    switch (action.type) {
        case AGREGAR_GASTO:
        case ELIMNAR_GASTO:
            return {
                ...state,
                gastos: action.payload
            }
        case FILTRAR_GASTOS:
            return {
                ...state,
                gastoFil: action.payload
            }
        case EDITAR_GASTO:
            return {
                ...state,
                gastoEditar: action.payload
            }
        default:
            return state;
    }
}

export default gastosReducer;