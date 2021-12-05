import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Header from './components/Header'
import Modal from './components/Modal'
import IconoNuevoGasto from './img/nuevo-gasto.svg'
import { generarId } from './helpers'
import ListadoGastos from './components/ListadoGastos'
import Filtros from './components/Filtros'

//Redux
import { activarModal, animarModalAction } from './actions/modal'
import { agregarGasto, editarGastos, filtrarGastos, eliminarGastoAction } from './actions/gastos'

function App() {
  
  const dispatch = useDispatch()

  const setModal = activar => dispatch( activarModal(activar) )
  const setAnimarModal = accion => dispatch( animarModalAction(accion) )
  const setGastos = gasto => dispatch( agregarGasto(gasto) )
  const setGastoEditar = gasto => dispatch( editarGastos(gasto) )
  const setGastoFil = gastos => dispatch( filtrarGastos(gastos) )
  const eliminar = gastos => dispatch( eliminarGastoAction(gastos) )

  const { activo } = useSelector( state => state.modal )
  const { esValido } = useSelector( state => state.presupuesto )
  const { gastos } = useSelector( state => state.gastos )
  const { gastoEditar } = useSelector( state => state.gastos )

  const [filtro, setFiltro] = useState('')

  useEffect(() => {
    if(Object.keys(gastoEditar).length > 0) {
      editar();
    }
  }, [gastoEditar])

  useEffect(() => {
    if( filtro ) {
      const gastosFiltrados = gastos.filter( gasto => gasto.categoria === filtro );

      setGastoFil(gastosFiltrados);
    }
  }, [filtro])

  const editar = () => {
    setModal(true);

    setTimeout(()=> {
      setAnimarModal(true);
    }, 500);

  }

  const handleNuevoGasto = () => {
    setModal(true);
    setGastoEditar({});

    setTimeout(()=> {
      setAnimarModal(true);
    }, 500);

  }

  const guardarGasto = gasto => {

    if(gasto.id) {
      const gastosActualizado = gastos.map( gastoState => gastoState.id === gasto.id ? gasto : gastoState )

      setGastos(gastosActualizado)
      setGastoEditar({});
    } else {
      gasto.id = generarId();
      gasto.fecha = Date.now();

      setGastos([...gastos, gasto]);
    }
    
    setAnimarModal(false);

    setTimeout(() => {
        setModal(false);
    }, 500)
  }

  const eliminarGastos = id => {
    const gastosActualizado = gastos.filter( gasto => gasto.id !== id );

    eliminar(gastosActualizado);
  }

  return (
    <div className={activo ? 'fijar' : ''}>
      <Header />

      { esValido ? (
        <>
          <main>

            <Filtros
              filtro={filtro}
              setFiltro={setFiltro}
            />

            <ListadoGastos
              setGastoEditar={setGastoEditar}
              eliminarGastos={eliminarGastos}
              filtro={filtro}
            />
          </main>

          <div className="nuevo-gasto">
            <img 
              src={IconoNuevoGasto}
              alt="icono nuevo gasto"
              onClick={handleNuevoGasto}
            />
          </div>
        </>
      ) : null }

      { activo && <Modal   
          guardarGasto={guardarGasto} 
          gastoEditar={gastoEditar}
          setGastoEditar={setGastoEditar}
        /> 
      }
    </div>
  )
}

export default App
