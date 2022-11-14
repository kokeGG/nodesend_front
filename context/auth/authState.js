import React from "react";
import { useReducer } from "react";
import authContext from "./authContext";
import authReducer from "./authReducer";

import { REGISTRO_EXITOSO, REGISTRO_ERROR, LIMPIAR_ALERTA } from "../../types";

import clienteAxios from "../../config/axios";

const AuthState = ({ children }) => {
  // Definir un state inicial
  const initialState = {
    token: "",
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

  // Usuario autenticado
  const usuarioAutenticado = (nombre) => {
    dispatch({
      type: USUARIO_AUTENTICADO,
      payload: nombre,
    });
  };

  return (
    <authContext.Provider
      value={{
        token: state.token,
        autenticado: state.autenticado,
        usuario: state.usuario,
        mensaje: state.mensaje,
        registrarUsuario,
        usuarioAutenticado,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthState;
