import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Ventadeservicio} from '../models';
import {VentadeservicioRepository} from '../repositories';
import {authenticate} from'@loopback/authentication';


export class VentaController {
  constructor(
    @repository(VentadeservicioRepository)
    public ventadeservicioRepository : VentadeservicioRepository,
  ) {}

  @authenticate('admin')
  @post('/ventadeservicios')
  @response(200, {
    description: 'Ventadeservicio model instance',
    content: {'application/json': {schema: getModelSchemaRef(Ventadeservicio)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ventadeservicio, {
            title: 'NewVentadeservicio',
            exclude: ['id'],
          }),
        },
      },
    })
    ventadeservicio: Omit<Ventadeservicio, 'id'>,
  ): Promise<Ventadeservicio> {
    return this.ventadeservicioRepository.create(ventadeservicio);
  }

  @get('/ventadeservicios/count')
  @response(200, {
    description: 'Ventadeservicio model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Ventadeservicio) where?: Where<Ventadeservicio>,
  ): Promise<Count> {
    return this.ventadeservicioRepository.count(where);
  }

  @get('/ventadeservicios')
  @response(200, {
    description: 'Array of Ventadeservicio model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Ventadeservicio, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Ventadeservicio) filter?: Filter<Ventadeservicio>,
  ): Promise<Ventadeservicio[]> {
    return this.ventadeservicioRepository.find(filter);
  }

  @patch('/ventadeservicios')
  @response(200, {
    description: 'Ventadeservicio PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ventadeservicio, {partial: true}),
        },
      },
    })
    ventadeservicio: Ventadeservicio,
    @param.where(Ventadeservicio) where?: Where<Ventadeservicio>,
  ): Promise<Count> {
    return this.ventadeservicioRepository.updateAll(ventadeservicio, where);
  }

  @get('/ventadeservicios/{id}')
  @response(200, {
    description: 'Ventadeservicio model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Ventadeservicio, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Ventadeservicio, {exclude: 'where'}) filter?: FilterExcludingWhere<Ventadeservicio>
  ): Promise<Ventadeservicio> {
    return this.ventadeservicioRepository.findById(id, filter);
  }

  @patch('/ventadeservicios/{id}')
  @response(204, {
    description: 'Ventadeservicio PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ventadeservicio, {partial: true}),
        },
      },
    })
    ventadeservicio: Ventadeservicio,
  ): Promise<void> {
    await this.ventadeservicioRepository.updateById(id, ventadeservicio);
  }

  @put('/ventadeservicios/{id}')
  @response(204, {
    description: 'Ventadeservicio PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() ventadeservicio: Ventadeservicio,
  ): Promise<void> {
    await this.ventadeservicioRepository.replaceById(id, ventadeservicio);
  }

  @del('/ventadeservicios/{id}')
  @response(204, {
    description: 'Ventadeservicio DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.ventadeservicioRepository.deleteById(id);
  }
}
