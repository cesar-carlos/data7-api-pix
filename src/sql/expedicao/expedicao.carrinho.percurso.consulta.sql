SELECT *
FROM (
    SELECT cp.CodEmpresa,
      cp.CodCarrinhoPercurso,
      cpe.Item,
      cp.Origem,
      cp.CodOrigem,
      cpe.Situacao,
      cart.CodCarrinho,
      cart.Descricao NomeCarrinho,
      cart.CodigoBarras CodigoBarrasCarrinho,
      cart.Ativo Ativo,
      cpe.DataInicio,
      cpe.HoraInicio,
      cpe.DataFinalizacao,
      cpe.HoraFinalizacao,
      cpe.CodUsuario,
      cpe.NomeUsuario,
      co.CodSetorEstoque,
      se.Descricao NomeSetorEstoque
    FROM Expedicao.CarrinhoPercurso cp
      LEFT JOIN Expedicao.CarrinhoPercursoEstagio cpe ON cpe.CodEmpresa = cp.CodEmpresa
      AND cpe.CodCarrinhoPercurso = cp.CodCarrinhoPercurso
      LEFT JOIN Expedicao.Carrinho cart on cart.CodEmpresa = cpe.CodEmpresa
      AND cart.CodCarrinho = cp.CodCarrinho
      LEFT JOIN CaixaOperador co ON co.CodEmpresa = cp.CodEmpresa
      AND co.CodUsuario = cpe.CodUsuario
      LEFT JOIN Expedicao.SetorEstoque se ON se.CodSetorEstoque = co.CodSetorEstoque
  ) CarrinhoPercurso