import { FindDepedecy } from '../dependency/container.dependency';

import AppDependencysIntegracaoPix from './app.dependencys.integracao.pix';
import ContainerDependency from '../dependency/container.dependency';
import AppDependencysExpedicao from './app.dependencys.expedicao';
import AppDependencysGeral from './app.dependencys.geral';

export default class AppDependencys {
  public static load() {
    AppDependencysIntegracaoPix.load();
    AppDependencysExpedicao.load();
    AppDependencysGeral.load();
  }

  public static resolve<T>(params: FindDepedecy): T {
    return ContainerDependency.instance.resolve<T>(params);
  }

  public static clear() {
    ContainerDependency.instance.clear();
  }
}
