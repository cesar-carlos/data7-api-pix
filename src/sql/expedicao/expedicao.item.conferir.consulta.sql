SELECT *
FROM(
    SELECT ice.CodEmpresa,
      ice.CodConferir,
      ice.Item,
      cf.Origem,
      cf.CodOrigem,
      ice.CodCarrinhoPercurso,
      ice.ItemCarrinhoPercurso,
      ice.CodProduto,
      prod.Nome NomeProduto,
      prod.Ativo,
      prod.CodTipoProduto,
      ice.CodUnidadeMedida,
      und.Descricao NomeUnidadeMedida,
      prod.CodGrupoProduto,
      gp.Nome NomeGrupoProduto,
      prod.CodMarca,
      m.Nome NomeMarca,
      prod.CodSetorEstoque,
      se.Descricao nomeSetorEstoque,
      prod.NCM,
      prod.CodigoBarras1 CodigoBarras,
      prod.CodigoBarras2 CodigoBarras2,
      prod.CodigoReferencia,
      prod.CodigoFornecedor,
      prod.CodigoFabricante,
      prod.CodigoOriginal,
      prod.Endereco,
      ice.Quantidade,
      ice.QuantidadeConferida
    FROM Expedicao.ItemConferir ice
      INNER JOIN Expedicao.Conferir cf ON cf.CodEmpresa = ice.CodEmpresa
      AND cf.CodConferir = ice.CodConferir
      INNER JOIN Produto prod ON prod.CodProduto = ice.CodProduto
      LEFT JOIN UnidadeMedida und ON und.CodUnidadeMedida = ice.CodUnidadeMedida
      LEFT JOIN GrupoProduto gp on gp.CodGrupoProduto = prod.CodGrupoProduto
      LEFT JOIN Marca m ON m.CodMarca = prod.CodMarca
      LEFT JOIN Expedicao.SetorEstoque se ON se.CodSetorEstoque = prod.CodSetorEstoque
  ) ConferirItemConsulta