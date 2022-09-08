import { Deposito } from './Deposito';
export interface Movimiento{
    idMovimiento : number;
    fechaRegistro : Date;
    idDepositoDestino : number;
    idDepositoFuente : number;
}