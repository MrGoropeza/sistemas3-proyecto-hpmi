import { Deposito } from './Deposito';
export interface Movimiento{
    idMovimiento : number;
    fechaRegistro : Date;
    depositoFuente : Deposito;
    depositoOrigen : Deposito;
}