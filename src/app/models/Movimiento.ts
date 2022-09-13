import { TipoMovimiento } from './TipoMovimiento';
export interface Movimiento{
    idMovimiento : number;
    fechaRegistro : Date;
    idDeposito : number;
    idTipoMovimiento : TipoMovimiento;

}