import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'servitecaMongodb',
  connector: 'mongodb',
  url: 'mongodb+srv://PrimerSprint:1300GL@sprint1serviteca.vp2udnb.mongodb.net/ServitecaDBG36?retryWrites=true&w=majority',
  host: '',
  port: 0,
  user: '',
  password: '',
  database: '',
  useNewUrlParser: true
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class ServitecaMongodbDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'servitecaMongodb';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.servitecaMongodb', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
