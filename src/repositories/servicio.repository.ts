import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {ServitecaMongodbDataSource} from '../datasources';
import {Servicio, ServicioRelations, Ventadeservicio} from '../models';
import {VentadeservicioRepository} from './ventadeservicio.repository';

export class ServicioRepository extends DefaultCrudRepository<
  Servicio,
  typeof Servicio.prototype.id,
  ServicioRelations
> {

  public readonly ventadeservicios: HasManyRepositoryFactory<Ventadeservicio, typeof Servicio.prototype.id>;

  constructor(
    @inject('datasources.servitecaMongodb') dataSource: ServitecaMongodbDataSource, @repository.getter('VentadeservicioRepository') protected ventadeservicioRepositoryGetter: Getter<VentadeservicioRepository>,
  ) {
    super(Servicio, dataSource);
    this.ventadeservicios = this.createHasManyRepositoryFactoryFor('ventadeservicios', ventadeservicioRepositoryGetter,);
    this.registerInclusionResolver('ventadeservicios', this.ventadeservicios.inclusionResolver);
  }
}
