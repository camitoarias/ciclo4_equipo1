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
  Administrador,
} from '../models';
import {VentadeservicioRepository} from '../repositories';

export class VentadeservicioAdministradorController {
  constructor(
    @repository(VentadeservicioRepository)
    public ventadeservicioRepository: VentadeservicioRepository,
  ) { }

  @get('/ventadeservicios/{id}/administrador', {
    responses: {
      '200': {
        description: 'Administrador belonging to Ventadeservicio',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Administrador)},
          },
        },
      },
    },
  })
  async getAdministrador(
    @param.path.string('id') id: typeof Ventadeservicio.prototype.id,
  ): Promise<Administrador> {
    return this.ventadeservicioRepository.administrador(id);
  }
}
