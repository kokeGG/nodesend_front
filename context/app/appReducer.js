import {
    MOSTRAR_ALERTA,
    LIMPIAR_ALERTA,
    SUBIR_ARCHIVO,
    SUBIR_ARCHIVO_EXITO,
    SUBIR_ARCHIVO_ERROR,
    CREAR_ENLACE_ERROR,
    CREAR_ENLACE_EXITO
} from '../../types'
export default (state, action) => {
    switch(action.type) {
        case MOSTRAR_ALERTA:
            return {
                ...state,
                mensaje_archivo: action.payload
            }
        case LIMPIAR_ALERTA:
            return {
                ...state,
                mensaje_archivo: null
            }
        case SUBIR_ARCHIVO:
            return {
                ...state,
                cargando: true
            }
        case SUBIR_ARCHIVO_EXITO:
            return {
                ...state,
                nombre: action.payload.nombre,
                nombre_original: action.payload.nombreArchivo,
                cargando: null
            }
        case SUBIR_ARCHIVO_ERROR:
            return {
                ...state,
                mensaje_archivo: action.payload,
                cargando: null
            }
        default:
            return state
    }
}