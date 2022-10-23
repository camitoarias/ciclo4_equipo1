import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Ventadeservicio,
  Cliente,
} from '../models';
import {VentadeservicioRepository} from '../repositories';

export class VentadeservicioClienteController {
  constructor(
    @repository(VentadeservicioRepository)
    public ventadeservicioRepository: VentadeservicioRepository,
  ) { }

  @get('/ventadeservicios/{id}/cliente', {
    responses: {
      '200': {
        description: 'Cliente belonging to Ventadeservicio',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Cliente)},
          },
        },
      },
    },
  })
  async getCliente(
    @param.path.string('id') id: typeof Ventadeservicio.prototype.id,
  ): Promise<Cliente> {
    return this.ventadeservicioRepository.cliente(id);
  }
}
