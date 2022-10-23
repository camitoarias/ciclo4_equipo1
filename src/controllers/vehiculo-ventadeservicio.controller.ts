import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Vehiculo,
  Ventadeservicio,
} from '../models';
import {VehiculoRepository} from '../repositories';

export class VehiculoVentadeservicioController {
  constructor(
    @repository(VehiculoRepository) protected vehiculoRepository: VehiculoRepository,
  ) { }

  @get('/vehiculos/{id}/ventadeservicios', {
    responses: {
      '200': {
        description: 'Array of Vehiculo has many Ventadeservicio',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Ventadeservicio)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Ventadeservicio>,
  ): Promise<Ventadeservicio[]> {
    return this.vehiculoRepository.ventadeservicios(id).find(filter);
  }

  @post('/vehiculos/{id}/ventadeservicios', {
    responses: {
      '200': {
        description: 'Vehiculo model instance',
        content: {'application/json': {schema: getModelSchemaRef(Ventadeservicio)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Vehiculo.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ventadeservicio, {
            title: 'NewVentadeservicioInVehiculo',
            exclude: ['id'],
            optional: ['vehiculoId']
          }),
        },
      },
    }) ventadeservicio: Omit<Ventadeservicio, 'id'>,
  ): Promise<Ventadeservicio> {
    return this.vehiculoRepository.ventadeservicios(id).create(ventadeservicio);
  }

  @patch('/vehiculos/{id}/ventadeservicios', {
    responses: {
      '200': {
        description: 'Vehiculo.Ventadeservicio PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ventadeservicio, {partial: true}),
        },
      },
    })
    ventadeservicio: Partial<Ventadeservicio>,
    @param.query.object('where', getWhereSchemaFor(Ventadeservicio)) where?: Where<Ventadeservicio>,
  ): Promise<Count> {
    return this.vehiculoRepository.ventadeservicios(id).patch(ventadeservicio, where);
  }

  @del('/vehiculos/{id}/ventadeservicios', {
    responses: {
      '200': {
        description: 'Vehiculo.Ventadeservicio DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Ventadeservicio)) where?: Where<Ventadeservicio>,
  ): Promise<Count> {
    return this.vehiculoRepository.ventadeservicios(id).delete(where);
  }
}
