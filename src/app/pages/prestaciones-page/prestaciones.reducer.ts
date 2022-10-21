import { createReducer, on } from '@ngrx/store';
import { Prestacion } from 'src/app/models/prestacion';
import * as actions from "./prestaciones.actions";

export const initialState = {
    dialog: false,
    prestacion: {} as Prestacion,
    prestaciones: [],
    cantPrestaciones: 0,
    prestacionesSeleccionadas: [],
};

export const prestacionesReducer = createReducer(
    initialState,
    on(actions.entrada, (state) => {
        return {
            ...state,
            
        };
    }),
    on(actions.agregar, (state) => {
        return {
            ...state,
            dialog: true,
            prestacion: {} as Prestacion
        };
    }),
    on(actions.confirmarAgregar, (state, actions) => {
        return {
            ...state
        };
    }),
    on(actions.editar, (state, actions) => {
        return {
            ...state,
            dialog: true,
            prestacion: actions.prestacion
        };
    }),
);