import LiberacaoBloqueioDto from '../../../src/dto/liberacao.bloqueio.dto';
import LocalSqlServerLiberacaoBloqueioRepository from '../../../src/repository/local.sql.server.liberacao.bloqueio.repository';

describe('CRUD (LiberacaoBloqueio)', () => {
  const repository = new LocalSqlServerLiberacaoBloqueioRepository();

  const newEntity = new LiberacaoBloqueioDto({
    codEmpresa: 1,
    codFilial: 1,
    codLiberacaoBloqueio: 999999999,
    origem: 'DM',
    codOrigem: 1,
    codCliente: 1,
    dataHoraBloqueio: new Date(),
    codUsuarioBloqueio: 1,
    nomeUsuarioBloqueio: 'nomeUsuario',
    estacaoTrabalhoBloqueio: 'estacaoTrabalho',
    itemLiberacaoBloqueio: [
      {
        codLiberacaoBloqueio: 999999999,
        item: '001',
        status: 'B',
        codRegra: 1,
        regra: 'REGRA',
        mensagemBloqueio: 'mensagemBloqueio',
        descricaoBloqueio: 'descricaoBloqueio',
        observacaoBloqueio: 'observacaoBloqueio',
        dataHoraSolicitacao: new Date(),
        codUsuarioSolicitacao: 1,
        nomeUsuarioSolicitacao: 'nomeUsuarioSolicitacao',
        estacaoTrabalhoSolicitacao: 'estacaoTrabalhoSolicitacao',
        observacaoLiberacaoBloqueio: 'observacaoLiberacaoBloqueio',
        motivoRejeicaoLiberacaoBloqueio: 'motivoRejeicaoLiberacaoBloqueio',
      },
    ],
  });

  const upEntity = new LiberacaoBloqueioDto({
    codEmpresa: 1,
    codFilial: 1,
    codLiberacaoBloqueio: 999999999,
    origem: 'DM',
    codOrigem: 1,
    codCliente: 1,
    dataHoraBloqueio: new Date(),
    codUsuarioBloqueio: 1,
    nomeUsuarioBloqueio: 'nomeUsuario',
    estacaoTrabalhoBloqueio: 'estacaoTrabalho',
    itemLiberacaoBloqueio: [
      {
        codLiberacaoBloqueio: 999999999,
        item: '001',
        status: 'L',
        codRegra: 1,
        regra: 'REGRA',
        mensagemBloqueio: 'mensagemBloqueio',
        descricaoBloqueio: 'descricaoBloqueio',
        observacaoBloqueio: 'observacaoBloqueio',
        dataHoraSolicitacao: new Date(),
        codUsuarioSolicitacao: 1,
        nomeUsuarioSolicitacao: 'nomeUsuarioSolicitacao',
        estacaoTrabalhoSolicitacao: 'estacaoTrabalhoSolicitacao',
        observacaoLiberacaoBloqueio: 'observacaoLiberacaoBloqueio',
        motivoRejeicaoLiberacaoBloqueio: 'motivoRejeicaoLiberacaoBloqueio',
      },
    ],
  });

  it('deve inserir uma novo resitro', async () => {
    await repository.insert(newEntity);
  });

  it('deve ler registro gravado', async () => {
    const params = [
      { key: 'CodEmpresa', value: newEntity.codEmpresa },
      { key: 'CodFilial', value: newEntity.codFilial },
      { key: 'CodLiberacaoBloqueio', value: newEntity.codLiberacaoBloqueio },
    ];

    const entity = await repository.selectWhere(params);

    expect(entity?.length).toBe(1);
    expect(entity?.[0].codEmpresa).toBe(newEntity.codEmpresa);
    expect(entity?.[0].codFilial).toBe(newEntity.codFilial);
    expect(entity?.[0].codLiberacaoBloqueio).toBe(newEntity.codLiberacaoBloqueio);
    expect(entity?.[0].itemLiberacaoBloqueio.length).toBe(1);
    expect(entity?.[0].itemLiberacaoBloqueio[0].codLiberacaoBloqueio).toBe(newEntity.codLiberacaoBloqueio);
  });

  it('deve atualizar registro gravado', async () => {
    const params = [
      { key: 'CodEmpresa', value: newEntity.codEmpresa },
      { key: 'CodFilial', value: newEntity.codFilial },
      { key: 'CodLiberacaoBloqueio', value: newEntity.codLiberacaoBloqueio },
    ];

    await repository.update(upEntity);
    const entity = await repository.selectWhere(params);
    expect(entity?.length).toBe(1);
    expect(entity?.[0].itemLiberacaoBloqueio[0].status).toBe(upEntity.itemLiberacaoBloqueio[0].status);
  });

  it('deve deletar registro gravado', async () => {
    const params = [
      { key: 'CodEmpresa', value: newEntity.codEmpresa },
      { key: 'CodFilial', value: newEntity.codFilial },
      { key: 'CodLiberacaoBloqueio', value: newEntity.codLiberacaoBloqueio },
    ];

    const sut = await repository.delete(upEntity);
    const entity = await repository.selectWhere(params);
    expect(entity).toBe(undefined);
  });
});

export default {};
