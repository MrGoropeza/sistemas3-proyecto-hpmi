import { ITipoMovimiento } from './TipoMovimiento';
export interface Movimiento{
    idMovimiento : number;
    fechaRegistro : Date;
    idDeposito : number;
    idTipoMovimiento : ITipoMovimiento;
    cantidad : number;
    motivo: string;
}