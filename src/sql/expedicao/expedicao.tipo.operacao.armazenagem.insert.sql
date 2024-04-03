INSERT INTO Expedicao.TipoOperacaoArmazenagem(
	CodEmpresa,
	CodTipoOperacaoArmazenagem,
	Descricao,
	Ativo,
	CodPrioridade,
	CodRelatorio,
	CodLocalArmazenagem,
	MovimentaEstoque,
	CodTipoMovimentoEstoque,
	ControlaLote,
	ControlaSerie
  )
VALUES (
	@CodEmpresa,
	@CodTipoOperacaoArmazenagem,
	@Descricao,
	@Ativo,
	@CodPrioridade,
	@CodRelatorio,
	@CodLocalArmazenagem,
	@MovimentaEstoque,
	@CodTipoMovimentoEstoque,
	@ControlaLote,
	@ControlaSerie
  )
