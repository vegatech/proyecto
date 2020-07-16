import { OrderDetalle } from './OrderDetalle'

export class Order {
    id: number
    idUsuario: number
    idComprador: number
    fechaIns: Date
    montoBase: number
    montoIva: number
    montoTotal: number
    tarjeta: string
    numeroReferencia: number
    banco: string
    estatus: string
    detalles: OrderDetalle[]
}
