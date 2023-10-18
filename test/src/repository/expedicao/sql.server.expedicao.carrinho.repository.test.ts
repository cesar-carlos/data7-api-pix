import ExpedicaoCarrinhoDto from '../../../../src/dto/expedicao/expedicao.carrinho.dto';
import SqlServerExpedicaoCarrinhoRepository from '../../../../src/repository/expedicao/sql.server.expedicao.carrinho.repository';

describe('CRUD (sql.server.expedicao.carrinho.repository)', () => {
  const repository = new SqlServerExpedicaoCarrinhoRepository();
  const newEntity = new ExpedicaoCarrinhoDto({
    CodEmpresa: 999,
    CodCarrinho: 1,
    CodigoBarras: 'CodigoBarras',
    Descricao: 'Descricao',
    Situacao: 'Situacao',
    Ativo: 'S',
  });

  it('deve inserir uma novo resitro', async () => {
    const result = await repository.insert(newEntity);
  });

  it('deve ler registro gravado', async () => {
    const result = await repository.selectWhere([
      { key: 'CodEmpresa', value: 999 },
      { key: 'CodCarrinho', value: 1 },
    ]);

    expect(result?.length).toBe(1);
    expect(result?.[0].CodCarrinho).toBe(newEntity.CodCarrinho);
  });

  it('deve atualizar registro gravado', async () => {});

  it('deve deletar registro gravado', async () => {
    repository.delete(newEntity);
  });
});

export default {};
