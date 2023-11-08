INSERT INTO Expedicao.CarrinhoPercursoEstagio(
    CodEmpresa,
    CodCarrinhoPercurso,
    Item,
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
    @Situacao,
    @DataInicio,
    @HoraInicio,
    @DataFinalizacao,
    @HoraFinalizacao,
    @CodUsuario,
    @NomeUsuario
  )