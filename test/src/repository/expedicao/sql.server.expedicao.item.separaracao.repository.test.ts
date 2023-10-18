import ExpedicaoItemSepararacaoEstoqueDto from '../../../../src/dto/expedicao/expedicao.item.separacao.estoque.dto';
import SqlServerExpedicaoItemSepararacaoRepository from '../../../../src/repository/expedicao/sql.server.expedicao.item.separacao.repository';

describe('CRUD (sql.server.expedicao.item.separaracao.repository)', () => {
  const repository = new SqlServerExpedicaoItemSepararacaoRepository();
  const newEntity = new ExpedicaoItemSepararacaoEstoqueDto({
    CodEmpresa: 999,
    CodSepararEstoque: 1,
    Item: 1,
    SessionId: 'SessionId',
    CodCarrinho: 1,
    CodSeparador: 1,
    NomeSeparador: 'NomeSeparador',
    DataSeparacao: new Date(),
    HoraSeparacao: '00:00',
    CodProduto: 1,
    CodUnidadeMedida: 'UND',
    Quantidade: 1,
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
