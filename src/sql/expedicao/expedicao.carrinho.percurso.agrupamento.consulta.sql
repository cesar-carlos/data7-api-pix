SELECT *
FROM (
    SELECT cpe.CodEmpresa,
      cpe.CodCarrinhoPercurso,
      cpa.Item ItemAgrupamento,
      cpe.Item ItemCarrinhoPercurso,
      cpe.Origem,
      COALESCE(cpa.Situacao, cpe.Situacao) Situacao,
      cp.Situacao SituacaoPercurso,
      CodCarrinhoAgrupador,
      carta.Descricao NomeCarrinhoAgrupador,
      cpe.CodCarrinho,
      cart.Descricao NomeCarrinho,
      cart.CodigoBarras CodigoBarrasCarrinho,
      cpe.DataInicio,
      cpe.HoraInicio,
      cpe.CodUsuarioInicio,
      cpe.NomeUsuarioInicio
    FROM Expedicao.CarrinhoPercursoEstagio cpe
      INNER JOIN Expedicao.CarrinhoPercurso cp ON cp.CodEmpresa = cpe.CodEmpresa
      AND cp.CodCarrinhoPercurso = cpe.CodCarrinhoPercurso
      INNER JOIN Expedicao.Carrinho cart ON cart.CodEmpresa = cpe.CodEmpresa
      AND cart.CodCarrinho = cpe.CodCarrinho
      LEFT JOIN Expedicao.CarrinhoPercursoAgrupamento cpa ON cpa.CodEmpresa = cpe.CodEmpresa
      AND cpa.Origem = cpe.Origem
      AND cpa.CodCarrinhoPercurso = cpe.CodCarrinhoPercurso
      AND cpa.ItemCarrinhoPercurso = cpe.Item
      AND cpa.Situacao NOT IN ('CANCELADA')
      LEFT JOIN Expedicao.Carrinho carta ON carta.CodEmpresa = cpa.CodEmpresa
      AND carta.CodCarrinho = cpa.CodCarrinhoAgrupador
  ) CarrinhoPercursoAgrupamentoConsulta