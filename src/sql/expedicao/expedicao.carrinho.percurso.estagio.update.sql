UPDATE Expedicao.CarrinhoPercursoEstagio
SET Situacao = @Situacao,
  DataInicio = @DataInicio,
  HoraInicio = @HoraInicio,
  DataFinalizacao = @DataFinalizacao,
  HoraFinalizacao = @HoraFinalizacao,
  CodUsuario = @CodUsuario,
  NomeUsuario = @NomeUsuario
WHERE CodEmpresa = @CodEmpresa
  AND CodCarrinhoPercurso = @CodCarrinhoPercurso
  AND CodPercursoEstagio = @CodPercursoEstagio
  AND CodCarrinho = @CodCarrinho