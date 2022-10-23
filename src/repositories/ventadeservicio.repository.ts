import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {ServitecaMongodbDataSource} from '../datasources';
import {Ventadeservicio, VentadeservicioRelations, Cliente, Administrador} from '../models';
import {ClienteRepository} from './cliente.repository';
import {AdministradorRepository} from './administrador.repository';

export class VentadeservicioRepository extends DefaultCrudRepository<
  Ventadeservicio,
  typeof Ventadeservicio.prototype.id,
  VentadeservicioRelations
> {

  public readonly cliente: BelongsToAccessor<Cliente, typeof Ventadeservicio.prototype.id>;

  public readonly administrador: BelongsToAccessor<Administrador, typeof Ventadeservicio.prototype.id>;

  constructor(
    @inject('datasources.servitecaMongodb') dataSource: ServitecaMongodbDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('AdministradorRepository') protected administradorRepositoryGetter: Getter<AdministradorRepository>,
  ) {
    super(Ventadeservicio, dataSource);
    this.administrador = this.createBelongsToAccessorFor('administrador', administradorRepositoryGetter,);
    this.registerInclusionResolver('administrador', this.administrador.inclusionResolver);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
  }
}
