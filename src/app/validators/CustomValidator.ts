import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { ArticuloComprobante } from "../models/ArticuloComprobante";

export const CustomValidator = /^(20|23|27|30|33)([0-9]{9}|-[0-9]{8}-[0-9]{1})$/g;


export const NroFacturaRegExp = /^\d{4}(-)\d+/;


export function articulosValidator(): ValidatorFn{

    return (control: AbstractControl): ValidationErrors | null => {
        let articulosInvalidos = false;
        if(control.value){
          if(control.value.length > 0){
            control.value.forEach(
                (element: { precio: number; cantidad: number; }) => {
                if(element.precio <= 0 || element.cantidad <= 0){
                  articulosInvalidos = true;

                }
                if(!element.precio){
                  articulosInvalidos = true;

                }
                if(!element.cantidad){
                  articulosInvalidos = true;

                }
              }
            );
          };
        }else{
          articulosInvalidos = true;
        }
        return articulosInvalidos ? {articulos: {value: articulosInvalidos}} : null;
    };

}


export function cantidadesValidator(): ValidatorFn{

  return (control: AbstractControl): ValidationErrors | null => {
      let articulosInvalidos = false;

      if(control.value){
        if(control.value.length > 0){
          control.value.forEach(
              (element: { cantidad: number; }) => {
              if(element.cantidad <= 0){
                articulosInvalidos = true;
              }
              if(!element.cantidad){
                articulosInvalidos = true;
              }
            }
          );
        };
      }

      return articulosInvalidos ? {articulos: {value: articulosInvalidos}} : null;
  };

}