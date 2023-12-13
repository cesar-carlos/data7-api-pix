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
      cpe.DataInicio,
      cpe.HoraInicio,
      cpe.CodUsuarioInicio,
      cpe.NomeUsuarioInicio,
      cpe.DataFinalizacao,
      cpe.HoraFinalizacao,
      co.CodSetorEstoque,
      se.Descricao NomeSetorEstoque,
      can.CodCancelamento,
      can.CodMotivoCancelamento,
      mc.Descricao DescricaoMotivoCancelamento,
      can.DataCancelamento,
      can.HoraCancelamento,
      can.CodUsuarioCancelamento,
      can.NomeUsuarioCancelamento,
      can.ObservacaoCancelamento
    FROM Expedicao.CarrinhoPercursoEstagio cpe
      INNER JOIN Expedicao.CarrinhoPercurso cp ON cp.CodEmpresa = cpe.CodEmpresa
      AND cp.CodCarrinhoPercurso = cpe.CodCarrinhoPercurso
      LEFT JOIN Expedicao.Carrinho cart ON cart.CodEmpresa = cpe.CodEmpresa
      AND cart.CodCarrinho = cpe.CodCarrinho
      LEFT JOIN CaixaOperador co ON co.CodUsuario = cpe.CodUsuarioInicio
      LEFT JOIN Expedicao.SetorEstoque se ON se.CodSetorEstoque = co.CodSetorEstoque
      LEFT JOIN Expedicao.Cancelamento can ON can.Origem = 'CP'
      AND can.CodOrigem = cpe.CodCarrinhoPercurso
      AND can.ItemOrigem = cpe.Item
      LEFT JOIN MotivoCancelamento mc ON mc.CodMotivoCancelamento = can.CodMotivoCancelamento
  ) CarrinhoPercursoConsulta