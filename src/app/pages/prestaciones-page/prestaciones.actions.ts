import { createAction, props } from "@ngrx/store";
import { Prestacion } from "src/app/models/prestacion";

export const entrada = createAction("[Prestaciones Page] Entrada");

export const salida = createAction("[Prestaciones Page] Salida");

export const agregar = createAction("[Prestaciones Page] Agregar");
export const confirmarAgregar = createAction(
    "[Prestaciones Page] Confirmar Agregar",
    props<{prestacion: Prestacion}>()
);

export const eliminar = createAction(
    "[Prestaciones Page] Eliminar",
    props<{prestacion: Prestacion}>()
);
export const confirmarEliminar = createAction("[Prestaciones Page] Confirmar Eliminar");

export const editar = createAction(
    "[Prestaciones Page] Editar", 
    props<{prestacion: Prestacion}>()
);
export const confirmarEditar = createAction(
    "[Prestaciones Page] Confirmar Editar",
    props<{prestacion: Prestacion}>()
);

export const cancelar = createAction("[Prestaciones Page] Cancelar");

export const seleccionarPrestacion = createAction(
    "[Prestaciones Page] Seleccionar Prestacion",
    props<{prestacion: Prestacion}>()
);

export const seleccionarTodasPrestaciones = createAction(
    "[Prestaciones Page] Seleccionar Todas Prestaciones",
    props<{prestaciones: Prestacion[]}>()
);

export const deseleccionarPrestacion = createAction(
    "[Prestaciones Page] Deseleccionar Prestacion",
    props<{prestacion: Prestacion}>()
);

export const borrarSeleccion = createAction(
    "[Prestaciones Page] Borrar Seleccion",
);