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
  Administrador,
  Ventadeservicio,
} from '../models';
import {AdministradorRepository} from '../repositories';

export class AdministradorVentadeservicioController {
  constructor(
    @repository(AdministradorRepository) protected administradorRepository: AdministradorRepository,
  ) { }

  @get('/administradors/{id}/ventadeservicios', {
    responses: {
      '200': {
        description: 'Array of Administrador has many Ventadeservicio',
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
    return this.administradorRepository.ventadeservicios(id).find(filter);
  }

  @post('/administradors/{id}/ventadeservicios', {
    responses: {
      '200': {
        description: 'Administrador model instance',
        content: {'application/json': {schema: getModelSchemaRef(Ventadeservicio)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Administrador.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ventadeservicio, {
            title: 'NewVentadeservicioInAdministrador',
            exclude: ['id'],
            optional: ['administradorId']
          }),
        },
      },
    }) ventadeservicio: Omit<Ventadeservicio, 'id'>,
  ): Promise<Ventadeservicio> {
    return this.administradorRepository.ventadeservicios(id).create(ventadeservicio);
  }

  @patch('/administradors/{id}/ventadeservicios', {
    responses: {
      '200': {
        description: 'Administrador.Ventadeservicio PATCH success count',
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
    return this.administradorRepository.ventadeservicios(id).patch(ventadeservicio, where);
  }

  @del('/administradors/{id}/ventadeservicios', {
    responses: {
      '200': {
        description: 'Administrador.Ventadeservicio DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Ventadeservicio)) where?: Where<Ventadeservicio>,
  ): Promise<Count> {
    return this.administradorRepository.ventadeservicios(id).delete(where);
  }
}
