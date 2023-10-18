import ExpedicaoSepararEstoqueDto from '../../../../src/dto/expedicao/expedicao.separar.estoque.dto';
import SqlServerExpedicaoSepararRepository from '../../../../src/repository/expedicao/sql.server.expedicao.separar.repository';

describe('CRUD (sql.server.expedicao.separar.repository)', () => {
  const repository = new SqlServerExpedicaoSepararRepository();
  const newEntity = new ExpedicaoSepararEstoqueDto({
    CodEmpresa: 999,
    CodSepararEstoque: 1,
    CodTipoOperacaoExpedicao: 1,
    TipoEntidade: 'C',
    CodEntidade: 1,
    NomeEntidade: 'WENDER',
    Situacao: 'AGUARDANDO',
    Data: new Date(),
    Hora: '00:00',
    CodPrioridade: 1,
    Historico: '',
    Observacao: undefined,
  });

  it('deve inserir uma novo resitro', async () => {
    const result = await repository.insert(newEntity);
  });

  it('deve ler registro gravado', async () => {
    const result = await repository.selectWhere([
      { key: 'CodEmpresa', value: 999 },
      { key: 'CodSepararEstoque', value: 1 },
    ]);

    expect(result?.length).toBe(1);
    expect(result?.[0].CodSepararEstoque).toBe(newEntity.CodSepararEstoque);
  });

  it('deve atualizar registro gravado', async () => {});

  it('deve deletar registro gravado', async () => {
    repository.delete(newEntity);
  });
});

export default {};
