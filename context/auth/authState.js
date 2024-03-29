import React from "react";
import { useReducer } from "react";
import authContext from "./authContext";
import authReducer from "./authReducer";
import { 
  REGISTRO_EXITOSO, 
  REGISTRO_ERROR, 
  LIMPIAR_ALERTA, 
  LOGIN_EXITOSO,
  LOGIN_ERROR, 
  USUARIO_AUTENTICADO,
  CERRAR_SESION
} from "../../types";

import clienteAxios from "../../config/axios";
import tokenAuth from "../../config/tokenAuth";
//authState tienen las acciones que disparan lo que hace reducer
const AuthState = ({ children }) => {
  // Definir un state inicial
  const initialState = {
    token: typeof window !== 'undefined' ? localStorage.getItem('token') : '',
    autenticado: null,
    usuario: null,
    mensaje: null,
  };
  // Definir el reducer
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Registrar nuevos usuarios
  const registrarUsuario = async (datos) => {
    try {
      const respuesta = await clienteAxios.post("/api/usuarios", datos);
      console.log(respuesta);
      console.log(respuesta.data.msg);
      dispatch({
        type: REGISTRO_EXITOSO,
        payload: respuesta.data.msg,
      });
    } catch (error) {
      console.log(error.response.data.msg);
      dispatch({
        type: REGISTRO_ERROR,
        payload: error.response.data.msg,
      });
    }
    // Limpiar la alerta después de 3 segundos.
    setTimeout(() => {
      dispatch({
        type: LIMPIAR_ALERTA,
      });
    }, 3000);
  };

  // Autenticar usuarios
  const iniciarSesion = async (datos) => {
    try {
      const respuesta = await clienteAxios.post("/api/auth", datos);
      dispatch({
        type: LOGIN_EXITOSO,
        payload: respuesta.data.token //modifica el state
      })
    } catch (error) {
      console.log(error.response.data.msg);
      dispatch({
        type: LOGIN_ERROR,
        payload: error.response.data.msg
      })
    }
    
    // Limpiar la alerta después de 3 segundos.
    setTimeout(() => {
      dispatch({
        type: LIMPIAR_ALERTA,
      });
    }, 3000);
  };

  // Retorne el usuario autenticado en base al JWT
  const usuarioAutenticado = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      tokenAuth(token)
    }

    try {
      const respuesta = await clienteAxios.get('api/auth');
      console.log(respuesta.data.usuario)
      console.log(respuesta);
      dispatch({
        type: USUARIO_AUTENTICADO,
        payload: respuesta.data.usuario
      })
    } catch (error) {
      dispatch({
        type: LOGIN_ERROR,
        payload: error.response.data.msg
      })
    }
  }

  //Cerrar la sesión
  const cerrarSesion = () => {
    dispatch({
      type: CERRAR_SESION
    })
  }

  return (
    <authContext.Provider
      value={{
        token: state.token,
        autenticado: state.autenticado,
        usuario: state.usuario,
        mensaje: state.mensaje,
        registrarUsuario,
        usuarioAutenticado,
        iniciarSesion,
        cerrarSesion
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthState;
