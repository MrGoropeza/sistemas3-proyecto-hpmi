import { Inject, Injectable, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { PrimeNGConfig } from 'primeng/api';

@Injectable({
    providedIn: 'root',
})
export class LocaleService{

    constructor(
        private primeNGConfig: PrimeNGConfig
    ) {}

    setEspaniol(){
        this.primeNGConfig.setTranslation(localeEsp);
    }

}


const localeEsp = {
    accept: 'Aceptar',
    reject: 'Rechazar',
    cancel: 'Cancelar',
    firstDayOfWeek: 6,
    dayNames: ['Lunes', 'Martes', 'Míercoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
    dayNamesShort: ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'],
    dayNamesMin: ['L', 'M', 'X', 'J', 'V', 'S', 'D'],
    monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre',
        'Noviembre', 'Diciembre'],
    monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dec'],
    today: 'Hoy',
    clear: 'Limpiar',
};