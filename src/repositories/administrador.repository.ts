import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {ServitecaMongodbDataSource} from '../datasources';
import {Administrador, AdministradorRelations, Ventadeservicio} from '../models';
import {VentadeservicioRepository} from './ventadeservicio.repository';

export class AdministradorRepository extends DefaultCrudRepository<
  Administrador,
  typeof Administrador.prototype.id,
  AdministradorRelations
> {

  public readonly ventadeservicios: HasManyRepositoryFactory<Ventadeservicio, typeof Administrador.prototype.id>;

  constructor(
    @inject('datasources.servitecaMongodb') dataSource: ServitecaMongodbDataSource, @repository.getter('VentadeservicioRepository') protected ventadeservicioRepositoryGetter: Getter<VentadeservicioRepository>,
  ) {
    super(Administrador, dataSource);
    this.ventadeservicios = this.createHasManyRepositoryFactoryFor('ventadeservicios', ventadeservicioRepositoryGetter,);
    this.registerInclusionResolver('ventadeservicios', this.ventadeservicios.inclusionResolver);
  }
}
