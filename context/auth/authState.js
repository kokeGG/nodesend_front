import React from "react";
import { useReducer } from "react";
import authContext from "./authContext";
import authReducer from "./authReducer";

import {REGISTRO_EXITOSO} from '../../types'

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
  const registrarUsuario = async datos => {
    try {
      const respuesta = await clienteAxios.post('/api/usuarios', datos);
      console.log(respuesta)
      console.log(respuesta.data.msg);
      dispatch({
        type: REGISTRO_EXITOSO,
        payload: respuesta.data.msg
      })
    } catch (error) {
      console.log(error);
    }
  }

  // Usuario autenticado
  const usuarioAutenticado = nombre => {
    dispatch({
        type: USUARIO_AUTENTICADO,
        payload: nombre
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
        usuarioAutenticado
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthState;
