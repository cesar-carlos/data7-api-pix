INSERT INTO Expedicao.CarrinhoPercursoEstagio(
    CodEmpresa,
    CodCarrinhoPercurso,
    CodPercursoEstagio,
    CodCarrinho,
    Situacao,
    DataInicio,
    HoraInicio,
    DataFinalizacao,
    HoraFinalizacao,
    CodUsuario,
    NomeUsuario
  )
VALUES (
    @CodEmpresa,
    @CodCarrinhoPercurso,
    @CodPercursoEstagio,
    @CodCarrinho,
    @Situacao,
    @DataInicio,
    @HoraInicio,
    @DataFinalizacao,
    @HoraFinalizacao,
    @CodUsuario,
    @NomeUsuario
  )