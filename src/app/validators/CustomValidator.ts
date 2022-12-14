import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { ArticuloComprobante } from "../models/ArticuloComprobante";

export const CustomValidator = /^(20|23|27|30|33)([0-9]{9}|-[0-9]{8}-[0-9]{1})$/;

export const correoValidator = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

export const dniValidator = /^\d{8}(?:[-\s]\d{4})?$/;

export const telefonoValidator = /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/;

export const NroFacturaRegExp = /^\d{4}(-)\d+/;


export function articulosValidator(): ValidatorFn{

    return (control: AbstractControl): ValidationErrors | null => {
        let articulosInvalidos = false;
        // console.log("Inicio Articulos Validator:");
        
        if(control.value){
          // console.log("El control tiene un valor.");
          
          if(control.value.length > 0){
            // console.log("Hay más de un artículo.");

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
          }else{
            articulosInvalidos = true;
          }
        }else{
          articulosInvalidos = true;
        }
        // console.log("Articulos Validator", articulosInvalidos);
        
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