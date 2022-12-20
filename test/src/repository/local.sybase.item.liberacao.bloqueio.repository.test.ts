import dotenv from 'dotenv';
import LiberacaoBloqueioDto from '../../../src/dto/liberacao.bloqueio.dto';
import ItemLiberacaoBloqueioDto from '../../../src/dto/item.liberacao.bloqueio.dto';
import LocalSybaseLiberacaoBloqueioRepository from '../../../src/repository/local.sybase.liberacao.bloqueio.repository';
import LocalSybaseItemLiberacaoBloqueioRepository from '../../../src/repository/local.sybase.item.liberacao.bloqueio.repository';

describe('CRUD (Item LiberacaoBloqueio sybase)', () => {
  const bloqueio = new LocalSybaseLiberacaoBloqueioRepository();
  const repository = new LocalSybaseItemLiberacaoBloqueioRepository();

  const newEntity = new LiberacaoBloqueioDto({
    codEmpresa: 1,
    codFilial: 1,
    codLiberacaoBloqueio: 999999,
    origem: 'DM',
    codOrigem: 1,
    codCliente: 15,
    dataHoraBloqueio: new Date(),
    codUsuarioBloqueio: 1,
    nomeUsuarioBloqueio: 'nomeUsuario',
    estacaoTrabalhoBloqueio: 'estacaoTrabalho',
    itemLiberacaoBloqueio: [],
  });

  const itens: ItemLiberacaoBloqueioDto[] = [
    {
      codLiberacaoBloqueio: 999999,
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
  ];

  it('deve inserir uma novo resitro', async () => {
    await bloqueio.insert(newEntity);
    await repository.insert(itens[0]);
  });

  it('deve ler registro gravado', async () => {
    const params = [
      { key: 'CodLiberacaoBloqueio', value: itens[0].codLiberacaoBloqueio },
      { key: 'Status', value: itens[0].status },
    ];

    const entity = await repository.selectWhere(params);
    expect(entity?.length).toBe(1);
  });

  it('deve deletar registro gravado', async () => {
    const params = [{ key: 'CodLiberacaoBloqueio', value: itens[0].codLiberacaoBloqueio }];
    await repository.delete(itens[0]);
    await bloqueio.delete(newEntity);

    const item = await repository.selectWhere(params);
    expect(item).toBe(undefined);
  });
});

export default {};
