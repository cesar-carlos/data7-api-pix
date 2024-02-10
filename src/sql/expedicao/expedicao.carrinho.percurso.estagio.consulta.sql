SELECT *
FROM (
    SELECT cpe.CodEmpresa,
      cpe.CodCarrinhoPercurso,
      cpe.Item,
      cpe.CodPercursoEstagio,
      cpe.Origem,
      cpe.CodOrigem,
      cpe.Situacao,
      cpe.CodCarrinho,
      cart.Descricao NomeCarrinho,
      cart.CodigoBarras CodigoBarrasCarrinho,
      cart.Ativo Ativo,
      cpe.CodUsuarioInicio,
      cpe.NomeUsuarioInicio,
      cpe.DataInicio,
      cpe.HoraInicio,
      cpe.CodUsuarioFinalizacao,
      cpe.NomeUsuarioFinalizacao,
      cpe.DataFinalizacao,
      cpe.HoraFinalizacao,
      co.CodSetorEstoque,
      se.Descricao NomeSetorEstoque
    FROM Expedicao.CarrinhoPercursoEstagio cpe
      INNER JOIN Expedicao.CarrinhoPercurso cp ON cp.CodEmpresa = cpe.CodEmpresa
      AND cp.CodCarrinhoPercurso = cpe.CodCarrinhoPercurso
      LEFT JOIN Expedicao.Carrinho cart ON cart.CodEmpresa = cpe.CodEmpresa
      AND cart.CodCarrinho = cpe.CodCarrinho
      LEFT JOIN CaixaOperador co ON co.CodUsuario = cpe.CodUsuarioInicio
      LEFT JOIN Expedicao.SetorEstoque se ON se.CodSetorEstoque = co.CodSetorEstoque
  ) CarrinhoPercursoEstagioConsulta