INSERT INTO Expedicao.CarrinhoPercursoEstagio(
    CodEmpresa,
    CodCarrinhoPercurso,
    Item,
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
    @Item,
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