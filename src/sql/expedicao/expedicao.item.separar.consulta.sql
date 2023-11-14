SELECT *
FROM(
    SELECT ise.CodEmpresa,
      ise.CodSepararEstoque,
      ise.Item,
      ise.Origem,
      ise.CodOrigem,
      ise.ItemOrigem,
      ise.CodProduto,
      prod.Nome NomeProduto,
      prod.Ativo,
      prod.CodTipoProduto,
      ise.CodUnidadeMedida,
      und.Descricao NomeUnidadeMedida,
      prod.CodGrupoProduto,
      gp.Nome NomeGrupoProduto,
      prod.CodMarca,
      m.Nome NomeMarca,
      COALESCE(ise.CodSetorEstoque, 0) CodSetorEstoque,
      se.Descricao NomeSetorEstoque,
      prod.NCM,
      prod.CodigoBarras1 CodigoBarras,
      prod.CodigoBarras2 CodigoBarras2,
      prod.CodigoReferencia,
      prod.CodigoFornecedor,
      prod.CodigoFabricante,
      prod.CodigoOriginal,
      prod.Endereco,
      ise.CodLocaArmazenagem,
      la.Nome NomeLocaArmazenagem,
      ise.Quantidade,
      ise.QuantidadeInterna,
      ise.QuantidadeExterna,
      ise.QuantidadeSeparacao
    FROM Expedicao.ItemSepararEstoque ise
      INNER JOIN Produto prod ON prod.CodProduto = ise.CodProduto
      LEFT JOIN UnidadeMedida und ON und.CodUnidadeMedida = ise.CodUnidadeMedida
      LEFT JOIN GrupoProduto gp on gp.CodGrupoProduto = prod.CodGrupoProduto
      LEFT JOIN Marca m ON m.CodMarca = prod.CodMarca
      LEFT JOIN Expedicao.SetorEstoque se ON se.CodSetorEstoque = ise.CodSetorEstoque
      LEFT JOIN LocalArmazenagem la ON la.CodLocalArmazenagem = ise.CodLocaArmazenagem
  ) SepararItemConsulta