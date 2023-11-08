INSERT INTO Expedicao.CarrinhoPercurso(
    CodEmpresa,
    CodCarrinhoPercurso,
    Origem,
    CodOrigem,
    CodCarrinho,
    Situacao
  )
VALUES (
    @CodEmpresa,
    @CodCarrinhoPercurso,
    @Origem,
    @CodOrigem,
    @CodCarrinho,
    @Situacao
  )