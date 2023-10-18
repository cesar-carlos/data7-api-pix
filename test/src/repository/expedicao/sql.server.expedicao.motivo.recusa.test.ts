import ExpedicaoMotivoRecusaDto from '../../../../src/dto/expedicao/expedicao.motivo.recusa.dto';
import SqlServerExpedicaoMotivoRecusaRepository from '../../../../src/repository/expedicao/sql.server.expedicao.motivo.recusa.repository';

describe('CRUD (sql.server.expedicao.motivo.recusa)', () => {
  const repository = new SqlServerExpedicaoMotivoRecusaRepository();
  const newEntity = new ExpedicaoMotivoRecusaDto({
    CodMotivoRecusa: 999,
    Descricao: 'Descricao',
    Ativo: 'S',
  });

  it('deve inserir uma novo resitro', async () => {
    const result = await repository.insert(newEntity);
  });

  it('deve ler registro gravado', async () => {
    const result = await repository.selectWhere([{ key: 'CodMotivoRecusa', value: 999 }]);

    expect(result?.length).toBe(1);
    expect(result?.[0].CodMotivoRecusa).toBe(newEntity.CodMotivoRecusa);
  });

  it('deve atualizar registro gravado', async () => {});

  it('deve deletar registro gravado', async () => {
    repository.delete(newEntity);
  });
});

export default {};
