UPDATE Expedicao.CarrinhoPercursoAgrupamento
SET Origem = @Origem,
  ItemCarrinhoPercurso,
  Situacao,
  CodCarrinhoAgrupador,
  DataLancamento,
  HoraLancamento,
  CodUsuarioLancamento,
  NomeUsuarioLancamento
WHERE CodEmpresa = @CodEmpresa
  AND CodCarrinhoPercurso = @CodCarrinhoPercurso
  AND Item = @Item