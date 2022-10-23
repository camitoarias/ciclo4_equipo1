import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Cliente} from './cliente.model';
import {Administrador} from './administrador.model';

@model()
export class Ventadeservicio extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @property({
    type: 'number',
    required: true,
  })
  valor: number;

  @belongsTo(() => Cliente)
  clienteId: string;

  @property({
    type: 'string',
  })
  vehiculoId?: string;

  @property({
    type: 'string',
  })
  servicioId?: string;

  @belongsTo(() => Administrador)
  administradorId: string;

  constructor(data?: Partial<Ventadeservicio>) {
    super(data);
  }
}

export interface VentadeservicioRelations {
  // describe navigational properties here
}

export type VentadeservicioWithRelations = Ventadeservicio & VentadeservicioRelations;
