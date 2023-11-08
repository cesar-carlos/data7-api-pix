import { eContext } from '../dependency/container.dependency';

import ContainerDependency from '../dependency/container.dependency';
import LocalSqlServerProcessoExecutavelRepository from '../repository/common.data/local.sql.server.processo.executavel.repository';
import SqlServerExpedicaoCarrinhoConsultaRepository from '../repository/expedicao/sql.server.expedicao.carrinho.consulta.repository';
import SqlServerExpedicaoCarrinhoPercursoConsultaRepository from '../repository/expedicao/sql.server.expedicao.carrinho.percurso.consulta.repository';
import SqlServerExpedicaoCarrinhoPercursoEstagioRepository from '../repository/expedicao/sql.server.expedicao.carrinho.percurso.estagio.repository';
import SqlServerExpedicaoCarrinhoPercursoRepository from '../repository/expedicao/sql.server.expedicao.carrinho.percurso.repository';
import SqlServerExpedicaoCarrinhoRepository from '../repository/expedicao/sql.server.expedicao.carrinho.repository';
import SqlServerExpedicaoConsultaItemEstoqueRepository from '../repository/expedicao/sql.server.expedicao.item.consulta.estoque.repository';
import SqlServerExpedicaoItemSeparacaoEstoqueRepository from '../repository/expedicao/sql.server.expedicao.item.separacao.estoque.repository';
import SqlServerExpedicaoItemSepararEstoqueRepository from '../repository/expedicao/sql.server.expedicao.item.separar.estoque.repository';
import SqlServerExpedicaoMotivoRecusaRepository from '../repository/expedicao/sql.server.expedicao.motivo.recusa.repository';
import SqlServerExpedicaoPrioridadeRepository from '../repository/expedicao/sql.server.expedicao.prioridade.repository';
import SqlServerExpedicaoSeparacaoItemConsultaRepository from '../repository/expedicao/sql.server.expedicao.separacao.item.consulta.repository';
import SqlServerExpedicaoSepararItemConsultaRepository from '../repository/expedicao/sql.server.expedicao.separar.item.consulta.repository';
import SqlServerExpedicaoSepararRepository from '../repository/expedicao/sql.server.expedicao.separar.repository';
import SqlServerExpedicaoSetorEstoqueRepository from '../repository/expedicao/sql.server.expedicao.setor.estoque.repository';
import SqlServerExpedicaoTipoOperacaoExpedicaoRepository from '../repository/expedicao/sql.server.expedicao.tipo.operacao.expedicao.repository';
import SqlServerExpedicaoTipoSolicitacaoRepository from '../repository/expedicao/sql.server.expedicao.tipo.solicitacao.repository';

export default class AppDependencysExpedicao {
  public static load() {
    ContainerDependency.instance.register({
      context: eContext.sql_server,
      bind: 'LocalBaseRepositoryContract<ProcessoExecutavelDto>',
      instance: new LocalSqlServerProcessoExecutavelRepository(),
    });

    ContainerDependency.instance.register({
      context: eContext.sql_server,
      bind: 'LocalBaseRepositoryContract<ExpedicaoSetorEstoqueDto>',
      instance: new SqlServerExpedicaoSetorEstoqueRepository(),
    });

    ContainerDependency.instance.register({
      context: eContext.sql_server,
      bind: 'LocalBaseRepositoryContract<ExpedicaoPrioridadeDto>',
      instance: new SqlServerExpedicaoPrioridadeRepository(),
    });

    ContainerDependency.instance.register({
      context: eContext.sql_server,
      bind: 'LocalBaseRepositoryContract<ExpedicaoMotivoRecusaDto>',
      instance: new SqlServerExpedicaoMotivoRecusaRepository(),
    });

    ContainerDependency.instance.register({
      context: eContext.sql_server,
      bind: 'LocalBaseRepositoryContract<ExpedicaoTipoSolicitacaoDto>',
      instance: new SqlServerExpedicaoTipoSolicitacaoRepository(),
    });

    ContainerDependency.instance.register({
      context: eContext.sql_server,
      bind: 'LocalBaseRepositoryContract<ExpedicaoCarrinhoDto>',
      instance: new SqlServerExpedicaoCarrinhoRepository(),
    });

    ContainerDependency.instance.register({
      context: eContext.sql_server,
      bind: 'LocalBaseRepositoryContract<ExpedicaoTipoOperacaoExpedicaoDto>',
      instance: new SqlServerExpedicaoTipoOperacaoExpedicaoRepository(),
    });

    ContainerDependency.instance.register({
      context: eContext.sql_server,
      bind: 'LocalBaseRepositoryContract<ExpedicaoSepararEstoqueDto>',
      instance: new SqlServerExpedicaoSepararRepository(),
    });

    ContainerDependency.instance.register({
      context: eContext.sql_server,
      bind: 'LocalBaseRepositoryContract<ExpedicaoItemSepararEstoqueDto>',
      instance: new SqlServerExpedicaoItemSepararEstoqueRepository(),
    });

    ContainerDependency.instance.register({
      context: eContext.sql_server,
      bind: 'LocalBaseRepositoryContract<ExpedicaoItemSeparacaoEstoqueDto>',
      instance: new SqlServerExpedicaoItemSeparacaoEstoqueRepository(),
    });

    ContainerDependency.instance.register({
      context: eContext.sql_server,
      bind: 'LocalBaseRepositoryContract<ExpedicaoCarrinhoPercursoDto>',
      instance: new SqlServerExpedicaoCarrinhoPercursoRepository(),
    });

    ContainerDependency.instance.register({
      context: eContext.sql_server,
      bind: 'LocalBaseRepositoryContract<ExpedicaoCarrinhoPercursoEstagioDto>',
      instance: new SqlServerExpedicaoCarrinhoPercursoEstagioRepository(),
    });

    ContainerDependency.instance.register({
      context: eContext.sql_server,
      bind: 'LocalBaseConsultaRepositoryContract<ExpedicaoItemEstoqueDto>',
      instance: new SqlServerExpedicaoConsultaItemEstoqueRepository(),
    });

    ContainerDependency.instance.register({
      context: eContext.sql_server,
      bind: 'LocalBaseConsultaRepositoryContract<ExpedicaoCarrinhoPercursoConsultaDto>',
      instance: new SqlServerExpedicaoCarrinhoPercursoConsultaRepository(),
    });

    ContainerDependency.instance.register({
      context: eContext.sql_server,
      bind: 'LocalBaseConsultaRepositoryContract<ExpedicaoCarrinhoConsultaDto>',
      instance: new SqlServerExpedicaoCarrinhoConsultaRepository(),
    });

    ContainerDependency.instance.register({
      context: eContext.sql_server,
      bind: 'LocalBaseConsultaRepositoryContract<ExpedicaoSepararItemConsultaDto>',
      instance: new SqlServerExpedicaoSepararItemConsultaRepository(),
    });

    ContainerDependency.instance.register({
      context: eContext.sql_server,
      bind: 'LocalBaseConsultaRepositoryContract<ExpedicaoSeparacaoItemConsultaDto>',
      instance: new SqlServerExpedicaoSeparacaoItemConsultaRepository(),
    });
  }
}
