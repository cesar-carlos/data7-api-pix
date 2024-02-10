SELECT *
FROM (
    SELECT cpe.CodEmpresa,
      cpe.CodCarrinhoPercurso,
      cpe.Item ItemCarrinhoPercurso,
      cpa.Item ItemAgrupamento,
      cpe.Origem,
      COALESCE(cpa.Situacao, cpe.Situacao) Situacao,
      CodCarrinhoAgrupador,
      carta.Descricao NomeCarrinhoAgrupador,
      cpe.CodCarrinho,
      cart.Descricao NomeCarrinho,
      cpe.DataInicio,
      cpe.HoraInicio,
      cpe.CodUsuarioInicio,
      cpe.NomeUsuarioInicio
    FROM Expedicao.CarrinhoPercursoEstagio cpe
      INNER JOIN Expedicao.Carrinho cart ON cart.CodEmpresa = cpe.CodEmpresa
      AND cart.CodCarrinho = cpe.CodCarrinho
      LEFT JOIN Expedicao.CarrinhoPercursoAgrupamento cpa ON cpa.CodEmpresa = cpe.CodEmpresa
      AND cpa.Origem = cpe.Origem
      AND cpa.CodCarrinhoPercurso = cpe.CodCarrinhoPercurso
      AND cpa.ItemCarrinhoPercurso = cpe.Item
      LEFT JOIN Expedicao.Carrinho carta ON carta.CodEmpresa = cpa.CodEmpresa
      AND carta.CodCarrinho = cpa.CodCarrinhoAgrupador
  ) CarrinhoPercursoAgrupamentoConsulta