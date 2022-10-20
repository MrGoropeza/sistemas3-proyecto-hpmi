import { createAction, props } from "@ngrx/store";
import { Prestacion } from "src/app/models/prestacion";

export const prestacionesCargadas = createAction(
    '[Prestaciones Service] Prestaciones Cargadas Correctamente',
    props<{ prestaciones: Prestacion[] }>()
  );
  
  export const prestacionCreada = createAction(
    '[Prestaciones Service] Prestacion Creada Correctamente',
    props<{ data: any, error: any }>()
  );
  
  export const prestacionActualizada = createAction(
    '[Prestaciones Service] Prestacion Actualizada Correctamente',
    props<{ data: any, error: any }>()
  );
  
  export const prestacionEliminida = createAction(
    '[Prestaciones Service] Prestacion Eliminida Correctamente',
    props<{ data: any, error: any }>()
  );