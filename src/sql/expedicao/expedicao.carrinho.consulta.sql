SELECT *
FROM (
    SELECT cart.CodEmpresa,
      cart.CodCarrinho,
      cart.Descricao,
      cart.Ativo,
      cart.Situacao,
      cart.CodigoBarras,
      cartp.CodCarrinhoPercurso,
      cartpe.Item,
      cartp.Origem,
      cartp.CodOrigem,
      cartpe.DataInicio,
      cartpe.HoraInicio,
      cartpe.CodUsuario,
      cartpe.NomeUsuario,
      se.CodSetorEstoque,
      se.Descricao NomeSetorEstoque
    FROM Expedicao.Carrinho cart
      LEFT JOIN Expedicao.CarrinhoPercurso cartp ON cartp.CodEmpresa = cart.CodEmpresa
      AND cartp.CodCarrinho = cart.CodCarrinho
      AND cartp.Situacao = 'AB'
      LEFT JOIN Expedicao.CarrinhoPercursoEstagio cartpe ON cartpe.CodEmpresa = cartp.CodEmpresa
      AND cartpe.CodCarrinhoPercurso = cartp.CodCarrinhoPercurso
      AND cartpe.Situacao = 'AB'
      LEFT JOIN CaixaOperador co ON co.CodUsuario = cartpe.CodUsuario
      LEFT JOIN Expedicao.SetorEstoque se ON se.CodSetorEstoque = co.CodSetorEstoque
  ) CarrinhoConsulta