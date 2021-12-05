import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CerrarBtn from '../img/cerrar.svg'
import Mensaje from './Mensaje'

//Redux
import { activarModal, animarModalAction } from '../actions/modal'

const Modal = ({ guardarGasto, gastoEditar, setGastoEditar }) => {

    const dispatch = useDispatch()

    const setModal = activar => dispatch( activarModal(activar) ) 
    const setAnimarModal = accion => dispatch( animarModalAction(accion) )

    const { animarModal } = useSelector( state => state.modal )

    const [formulario, setFormulario] = useState({
        nombre: '',
        cantidad: 0,
        categoria: ''
    });

    const [mensaje, setMensaje] = useState('')

    useEffect(() => {
        if(Object.keys(gastoEditar).length > 0) {
            setFormulario({
                ...formulario,
                nombre: gastoEditar.nombre,
                cantidad: gastoEditar.cantidad,
                categoria: gastoEditar.categoria,
                id: gastoEditar.id,
                fecha: gastoEditar.fecha
            });
        }
    }, [])

    const handleChange = ({ target }) => {
        setFormulario({
            ...formulario,
            [target.name]: target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const {nombre, cantidad, categoria} = formulario;

        if([ nombre, categoria ].includes('') || cantidad <= 0) {
            setMensaje('Todos los campos son obligatorios')

            setTimeout(() => {
                setMensaje('');
            }, 3000)

            return;
        }
        
        guardarGasto(formulario);
    }

    const ocultarModal = () => {
        
        setAnimarModal(false);
        setGastoEditar({});

        setTimeout(() => {
            setModal(false);
        }, 500)
    }

    return (
        <div className="modal">
            <div className="cerrar-modal">
                <img 
                    src={CerrarBtn}
                    alt="cerrar modal"
                    onClick={ocultarModal}
                />
            </div>

            <form 
                className={`formulario ${animarModal ? 'animar' : 'cerrar'}`}
                onSubmit={handleSubmit}
            >
                <legend>{ gastoEditar.nombre ? 'Editar Gasto' : 'Nuevo Gasto' }</legend>

                { mensaje && <Mensaje tipo="error">{ mensaje }</Mensaje> }

                <div className="campo">
                    <label htmlFor="nombre">
                        Nombre Gasto
                    </label>

                    <input
                        id="nombre"
                        name="nombre"
                        type="text"
                        placeholder="Añade el nombre del Gasto"
                        value={ formulario.nombre }
                        onChange={ handleChange }
                    />
                </div>

                <div className="campo">
                    <label htmlFor="cantidad">
                        Cantidad
                    </label>

                    <input
                        id="cantidad"
                        name="cantidad"
                        type="number"
                        placeholder="Añade la cantidad del Gasto"
                        value={ formulario.cantidad }
                        onChange={ handleChange }
                    />
                </div>

                <div className="campo">
                    <label htmlFor="categoria">
                        Categoría
                    </label>

                    <select
                        id="categoria"
                        name="categoria"
                        onChange={handleChange}
                        value={formulario.categoria}
                    >
                        <option value="" disabled>-- Seleccione --</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="casa">Casa</option>
                        <option value="gastos">Gastos varios</option>
                        <option value="ocio">Ocio</option>
                        <option value="salud">Salud</option>
                        <option value="suscripciones">Suscripciones</option>
                    </select>
                </div>

                <input
                    type="submit"
                    value={ gastoEditar.nombre ? 'Guardar Cambios' : 'Añadir Gasto' }
                />
            </form>
        </div>
    )
}

export default Modal
