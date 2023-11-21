import { eContext } from '../dependency/container.dependency';

import ContainerDependency from '../dependency/container.dependency';
import SqlServerExpedicaoPrioridadeRepository from '../repository/expedicao/sql.server.expedicao.prioridade.repository';
import SqlServerExpedicaoMotivoRecusaRepository from '../repository/expedicao/sql.server.expedicao.motivo.recusa.repository';
import LocalSqlServerProcessoExecutavelRepository from '../repository/common.data/local.sql.server.processo.executavel.repository';
import SqlServerExpedicaoCarrinhoPercursoRepository from '../repository/expedicao/sql.server.expedicao.carrinho.percurso.repository';
import SqlServerExpedicaoCarrinhoConsultaRepository from '../repository/expedicao/sql.server.expedicao.carrinho.consulta.repository';
import SqlServerExpedicaoSepararItemConsultaRepository from '../repository/expedicao/sql.server.expedicao.item.separar.consulta.repository';
import SqlServerExpedicaoCarrinhoPercursoConsultaRepository from '../repository/expedicao/sql.server.expedicao.carrinho.percurso.consulta.repository';
import SqlServerExpedicaoCarrinhoPercursoEstagioRepository from '../repository/expedicao/sql.server.expedicao.carrinho.percurso.estagio.repository';
import SqlServerExpedicaoTipoOperacaoExpedicaoRepository from '../repository/expedicao/sql.server.expedicao.tipo.operacao.expedicao.repository';
import SqlServerExpedicaoItemSeparacaoConsultaRepository from '../repository/expedicao/sql.server.expedicao.item.separacao.consulta.repository';
import SqlServerExpedicaoPercursoEstagioRepository from '../repository/expedicao/sql.server.expedicao.percurso.estagio.repository';
import SqlServerExpedicaoTipoSolicitacaoRepository from '../repository/expedicao/sql.server.expedicao.tipo.solicitacao.repository';
import SqlServerExpedicaoItemSeparacaoRepository from '../repository/expedicao/sql.server.expedicao.item.separacao.repository';
import SqlServerExpedicaoSetorEstoqueRepository from '../repository/expedicao/sql.server.expedicao.setor.estoque.repository';
import SqlServerExpedicaoItemSepararRepository from '../repository/expedicao/sql.server.expedicao.item.separar.repository';
import SqlServerExpedicaoCarrinhoRepository from '../repository/expedicao/sql.server.expedicao.carrinho.repository';
import SqlServerExpedicaoSepararRepository from '../repository/expedicao/sql.server.expedicao.separar.repository';
import SqlServerCancelamentoRepository from '../repository/expedicao/sql.server.cancelamento.repository';

export default class AppDependencysExpedicao {
  public static load() {
    ContainerDependency.instance.register({
      context: eContext.sql_server,
      bind: 'LocalBaseRepositoryContract<ExpedicaoCancelamentoDto>',
      instance: new SqlServerCancelamentoRepository(),
    });

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
      bind: 'LocalBaseRepositoryContract<ExpedicaoItemSepararDto>',
      instance: new SqlServerExpedicaoItemSepararRepository(),
    });

    ContainerDependency.instance.register({
      context: eContext.sql_server,
      bind: 'LocalBaseRepositoryContract<ExpedicaoItemSeparacaoDto>',
      instance: new SqlServerExpedicaoItemSeparacaoRepository(),
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
      bind: 'LocalBaseRepositoryContract<ExpedicaoSepararDto>',
      instance: new SqlServerExpedicaoSepararRepository(),
    });

    ContainerDependency.instance.register({
      context: eContext.sql_server,
      bind: 'LocalBaseRepositoryContract<ExpedicaoPercursoEstagioDto>',
      instance: new SqlServerExpedicaoPercursoEstagioRepository(),
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
      bind: 'LocalBaseConsultaRepositoryContract<ExpedicaoItemSepararConsultaDto>',
      instance: new SqlServerExpedicaoSepararItemConsultaRepository(),
    });

    ContainerDependency.instance.register({
      context: eContext.sql_server,
      bind: 'LocalBaseConsultaRepositoryContract<ExpedicaoItemSeparacaoConsultaDto>',
      instance: new SqlServerExpedicaoItemSeparacaoConsultaRepository(),
    });
  }
}
