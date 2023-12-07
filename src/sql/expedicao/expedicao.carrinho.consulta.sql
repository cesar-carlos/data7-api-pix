SELECT *
FROM (
    SELECT cart.CodEmpresa,
      cart.CodCarrinho,
      cart.Descricao,
      cart.Ativo,
      cart.Situacao,
      cart.CodigoBarras,
      cartpe.CodCarrinhoPercurso,
      cartpe.CodPercursoEstagio,
      cpe.Descricao DescricaoPercursoEstagio,
      cartp.Origem,
      cartp.CodOrigem,
      cartpe.DataInicio,
      cartpe.HoraInicio,
      cartpe.CodUsuarioInicio,
      cartpe.NomeUsuarioInicio,
      se.CodSetorEstoque,
      se.Descricao NomeSetorEstoque
    FROM Expedicao.Carrinho cart
      LEFT JOIN Expedicao.CarrinhoPercursoEstagio cartpe ON cartpe.CodEmpresa = cart.CodEmpresa
      AND cartpe.CodCarrinho = cart.CodCarrinho
      AND cartpe.Situacao = 'EM ANDAMENTO'
      LEFT JOIN Expedicao.CarrinhoPercurso cartp ON cartp.CodEmpresa = cartpe.CodEmpresa
      AND cartp.CodCarrinhoPercurso = cartpe.CodCarrinhoPercurso
      LEFT JOIN Expedicao.PercursoEstagio cpe ON cpe.CodPercursoEstagio = cartpe.CodPercursoEstagio
      LEFT JOIN CaixaOperador co ON co.CodUsuario = cartpe.CodUsuarioInicio
      LEFT JOIN Expedicao.SetorEstoque se ON se.CodSetorEstoque = co.CodSetorEstoque
  ) CarrinhoConsulta