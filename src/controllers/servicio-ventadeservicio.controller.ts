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
  Servicio,
  Ventadeservicio,
} from '../models';
import {ServicioRepository} from '../repositories';

export class ServicioVentadeservicioController {
  constructor(
    @repository(ServicioRepository) protected servicioRepository: ServicioRepository,
  ) { }

  @get('/servicios/{id}/ventadeservicios', {
    responses: {
      '200': {
        description: 'Array of Servicio has many Ventadeservicio',
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
    return this.servicioRepository.ventadeservicios(id).find(filter);
  }

  @post('/servicios/{id}/ventadeservicios', {
    responses: {
      '200': {
        description: 'Servicio model instance',
        content: {'application/json': {schema: getModelSchemaRef(Ventadeservicio)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Servicio.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ventadeservicio, {
            title: 'NewVentadeservicioInServicio',
            exclude: ['id'],
            optional: ['servicioId']
          }),
        },
      },
    }) ventadeservicio: Omit<Ventadeservicio, 'id'>,
  ): Promise<Ventadeservicio> {
    return this.servicioRepository.ventadeservicios(id).create(ventadeservicio);
  }

  @patch('/servicios/{id}/ventadeservicios', {
    responses: {
      '200': {
        description: 'Servicio.Ventadeservicio PATCH success count',
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
    return this.servicioRepository.ventadeservicios(id).patch(ventadeservicio, where);
  }

  @del('/servicios/{id}/ventadeservicios', {
    responses: {
      '200': {
        description: 'Servicio.Ventadeservicio DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Ventadeservicio)) where?: Where<Ventadeservicio>,
  ): Promise<Count> {
    return this.servicioRepository.ventadeservicios(id).delete(where);
  }
}
