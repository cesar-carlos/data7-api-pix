import ExpedicaoTipoSolicitacaoDto from '../../../../src/dto/expedicao/expedicao.tipo.solicitacao.dto';
import SqlServerExpedicaoTipoSolicitacaoRepository from '../../../../src/repository/expedicao/sql.server.expedicao.tipo.solicitacao.repository';

describe('CRUD (sql.server.expedicao.tipo.solicitacao.repository)', () => {
  const repository = new SqlServerExpedicaoTipoSolicitacaoRepository();
  const newEntity = new ExpedicaoTipoSolicitacaoDto({
    CodTipoSolicitacao: 999,
    Descricao: 'Descricao',
    Ativo: 'S',
  });

  it('deve inserir uma novo resitro', async () => {
    const result = await repository.insert(newEntity);
  });

  it('deve ler registro gravado', async () => {
    const result = await repository.selectWhere([{ key: 'CodTipoSolicitacao', value: 999 }]);

    expect(result?.length).toBe(1);
    expect(result?.[0].CodTipoSolicitacao).toBe(newEntity.CodTipoSolicitacao);
  });

  it('deve atualizar registro gravado', async () => {});

  it('deve deletar registro gravado', async () => {
    repository.delete(newEntity);
  });
});

export default {};
