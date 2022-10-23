import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {ServitecaMongodbDataSource} from '../datasources';
import {Vehiculo, VehiculoRelations, Cliente, Ventadeservicio} from '../models';
import {ClienteRepository} from './cliente.repository';
import {VentadeservicioRepository} from './ventadeservicio.repository';

export class VehiculoRepository extends DefaultCrudRepository<
  Vehiculo,
  typeof Vehiculo.prototype.id,
  VehiculoRelations
> {

  public readonly cliente: BelongsToAccessor<Cliente, typeof Vehiculo.prototype.id>;

  public readonly ventadeservicios: HasManyRepositoryFactory<Ventadeservicio, typeof Vehiculo.prototype.id>;

  constructor(
    @inject('datasources.servitecaMongodb') dataSource: ServitecaMongodbDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('VentadeservicioRepository') protected ventadeservicioRepositoryGetter: Getter<VentadeservicioRepository>,
  ) {
    super(Vehiculo, dataSource);
    this.ventadeservicios = this.createHasManyRepositoryFactoryFor('ventadeservicios', ventadeservicioRepositoryGetter,);
    this.registerInclusionResolver('ventadeservicios', this.ventadeservicios.inclusionResolver);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
  }
}
