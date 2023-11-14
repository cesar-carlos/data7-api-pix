SELECT *
FROM (
    SELECT cpe.CodEmpresa,
      cpe.CodCarrinhoPercurso,
      cpe.CodPercursoEstagio,
      cp.Origem,
      cp.CodOrigem,
      cpe.Situacao,
      cpe.CodCarrinho,
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
    FROM Expedicao.CarrinhoPercursoEstagio cpe
      INNER JOIN Expedicao.CarrinhoPercurso cp ON cp.CodEmpresa = cpe.CodEmpresa
      AND cp.CodCarrinhoPercurso = cpe.CodCarrinhoPercurso
      LEFT JOIN Expedicao.Carrinho cart ON cart.CodEmpresa = cpe.CodEmpresa
      AND cart.CodCarrinho = cpe.CodCarrinho
      LEFT JOIN CaixaOperador co ON co.CodUsuario = cpe.CodUsuario
      LEFT JOIN Expedicao.SetorEstoque se ON se.CodSetorEstoque = co.CodSetorEstoque
  ) CarrinhoPercursoConsulta