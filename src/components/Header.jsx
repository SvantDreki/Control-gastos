import ControlPresupuesto from "./ControlPresupuesto"
import NuevoPresupuesto from "./NuevoPresupuesto"
import { useSelector } from 'react-redux'




const Header = () => {

    const { esValido } = useSelector( state => state.presupuesto )

    return (
        <header>
            <h1>
                Planificador de Gastos
            </h1>

            { esValido ? (
                <ControlPresupuesto />
            ) : (
                <NuevoPresupuesto />
            ) }

            
        </header>
    )
}

export default Header
