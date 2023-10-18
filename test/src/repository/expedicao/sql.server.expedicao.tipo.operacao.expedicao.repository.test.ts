import ExpedicaoTipoOperacaoExpedicaoDto from '../../../../src/dto/expedicao/expedicao.tipo.operacao.expedicao.dto';
import SqlServerExpedicaoTipoOperacaoExpedicaoRepository from '../../../../src/repository/expedicao/sql.server.expedicao.tipo.operacao.expedicao.repository';

describe('CRUD (sql.server.expedicao.tipo.operacao.expedicao.repository)', () => {
  const repository = new SqlServerExpedicaoTipoOperacaoExpedicaoRepository();
  const newEntity = new ExpedicaoTipoOperacaoExpedicaoDto({
    CodEmpresa: 999,
    CodTipoOperacaoExpedicao: 1,
    Descricao: 'Descricao',
    Ativo: 'S',
    Tipo: 'Tipo',
    CodRelatorio: 1,
    CodLocalArmazenagem: 1,
    MovimentaEstoque: 'S',
    CodTipoMovimentoEstoque: 1,
    ControlaLote: 'S',
    ControlaNumeroSerie: 'S',
  });

  it('deve inserir uma novo resitro', async () => {
    const result = await repository.insert(newEntity);
  });

  it('deve ler registro gravado', async () => {
    const result = await repository.selectWhere([
      { key: 'CodEmpresa', value: 999 },
      { key: 'CodTipoOperacaoExpedicao', value: 1 },
    ]);

    expect(result?.length).toBe(1);
    expect(result?.[0].CodTipoOperacaoExpedicao).toBe(newEntity.CodTipoOperacaoExpedicao);
  });

  it('deve atualizar registro gravado', async () => {});

  it('deve deletar registro gravado', async () => {
    repository.delete(newEntity);
  });
});

export default {};
