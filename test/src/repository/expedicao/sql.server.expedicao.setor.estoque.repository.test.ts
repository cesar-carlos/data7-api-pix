import ExpedicaoSetorEstoqueDto from '../../../../src/dto/expedicao/expedicao.setor.estoque.dto';
import SqlServerExpedicaoSetorEstoqueRepository from '../../../../src/repository/expedicao/sql.server.expedicao.setor.estoque.repository';

describe('CRUD (sql.server.expedicao.setor.estoque.repository', () => {
  const repository = new SqlServerExpedicaoSetorEstoqueRepository();
  const newEntity = new ExpedicaoSetorEstoqueDto({
    CodSetorEstoque: 999,
    Descricao: 'Descricao',
    Ativo: 'S',
  });

  it('deve inserir uma novo resitro', async () => {
    const result = await repository.insert(newEntity);
  });

  it('deve ler registro gravado', async () => {
    const result = await repository.selectWhere([{ key: 'CodSetorEstoque', value: 999 }]);

    expect(result?.length).toBe(1);
    expect(result?.[0].CodSetorEstoque).toBe(newEntity.CodSetorEstoque);
  });

  it('deve atualizar registro gravado', async () => {});

  it('deve deletar registro gravado', async () => {
    repository.delete(newEntity);
  });
});

export default {};
