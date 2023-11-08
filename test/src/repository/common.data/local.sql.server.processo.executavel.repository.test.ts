import ProcessoExecutavelDto from '../../../../src/dto/common.data/processo.executavel.dto';
import LocalSqlServerProcessoExecutavelRepository from '../../../../src/repository/common.data/local.sql.server.processo.executavel.repository';

describe('CRUD (local.sql.server.processo.executavel.repository)', () => {
  const repository = new LocalSqlServerProcessoExecutavelRepository();
  const newEntity = new ProcessoExecutavelDto({
    CodProcessoExecutavel: 99999,
    CodEmpresa: 1,
    CodFilial: 1,
    Status: 'ATIVO',
    Origem: 'SE',
    CodOrigem: 11,
    ItemOrigem: '001',
    DataAbertura: new Date(),
    CodUsuario: 1,
    NomeUsuario: 'NomeUsuario',
    CodContaFinanceira: 'CX',
    CodPeriodoCaixa: 1,
    StatusPeriodoCaixa: 'ABERTO',
    NomeComputador: 'NomeComputador',
    UsuarioWindows: 'UsuarioWindows',
    BancoDados: 'BancoDados',
  });

  it('deve inserir uma novo resitro', async () => {
    const result = await repository.insert(newEntity);
  });

  it('deve ler registro gravado', async () => {
    const result = await repository.selectWhere([{ key: 'CodProcessoExecutavel', value: 99999 }]);
    expect(result?.length).toBe(1);
  });

  it('deve atualizar registro gravado', async () => {});

  it('deve deletar registro gravado', async () => {
    repository.delete(newEntity);
  });
});

export default {};
