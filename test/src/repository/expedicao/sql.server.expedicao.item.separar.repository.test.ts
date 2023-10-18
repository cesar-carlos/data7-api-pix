import ExpedicaoItemSepararEstoqueDto from '../../../../src/dto/expedicao/expedicao.item.separar.estoque.dto';
import SqlServerExpedicaoItemSepararRepository from '../../../../src/repository/expedicao/sql.server.expedicao.item.separar.repository';

describe('CRUD (sql.server.expedicao.item.separar.repository)', () => {
  const repository = new SqlServerExpedicaoItemSepararRepository();
  const newEntity = new ExpedicaoItemSepararEstoqueDto({
    CodEmpresa: 999,
    CodSepararEstoque: 1,
    Item: '1',
    CodSetorEstoque: 1,
    Origem: 'EP',
    CodOrigem: 1,
    ItemOrigem: '1',
    CodLocaArmazenagem: 1,
    CodProduto: 1,
    CodUnidadeMedida: 'UN',
    Quantidade: 1,
    QuantidadeInterna: 1,
    QuantidadeExterna: 1,
    QuantidadeSeparacao: 1,
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
