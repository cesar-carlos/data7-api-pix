DELETE Expedicao.CarrinhoPercursoEstagio
WHERE CodEmpresa = @CodEmpresa
  AND CodCarrinhoPercurso = @CodCarrinhoPercurso
  AND CodPercursoEstagio = @CodPercursoEstagio
  AND CodCarrinho = @CodCarrinho