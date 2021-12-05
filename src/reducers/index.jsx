import { combineReducers } from 'redux'
import gastosReducer from './gastosReducer'
import modalReducer from './modalReducer'
import presupuestoReducer from './presupuestoReducer'

export default combineReducers({
    modal: modalReducer,
    presupuesto: presupuestoReducer,
    gastos: gastosReducer
})