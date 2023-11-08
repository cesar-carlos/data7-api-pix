UPDATE Expedicao.CarrinhoPercurso
SET Origem = @Origem,
  CodOrigem = @CodOrigem,
  CodCarrinho = @CodCarrinho,
  Situacao = @Situacao
WHERE CodEmpresa = @CodEmpresa
  AND CodCarrinhoPercurso = @CodCarrinhoPercurso