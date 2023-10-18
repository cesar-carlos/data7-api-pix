import ExpedicaoPrioridadeDto from '../../../../src/dto/expedicao/expedicao.prioridade.dto';
import SqlServerExpedicaoPrioridadeRepository from '../../../../src/repository/expedicao/sql.server.expedicao.prioridade.repository';

describe('CRUD (sql.server.expedicao.prioridade.repository)', () => {
  const repository = new SqlServerExpedicaoPrioridadeRepository();
  const newEntity = new ExpedicaoPrioridadeDto({
    CodPrioridade: 999,
    Descricao: 'Descricao',
    Prioridade: 1,
    Ativo: 'S',
  });

  it('deve inserir uma novo resitro', async () => {
    const result = await repository.insert(newEntity);
  });

  it('deve ler registro gravado', async () => {
    const result = await repository.selectWhere([{ key: 'CodPrioridade', value: 999 }]);

    expect(result?.length).toBe(1);
    expect(result?.[0].CodPrioridade).toBe(newEntity.CodPrioridade);
  });

  it('deve atualizar registro gravado', async () => {});

  it('deve deletar registro gravado', async () => {
    repository.delete(newEntity);
  });
});

export default {};
