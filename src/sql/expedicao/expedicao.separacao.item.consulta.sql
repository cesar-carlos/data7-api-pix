SELECT *
FROM (
    SELECT ie.CodEmpresa,
      ie.CodSepararEstoque,
      ie.Item,
      ie.SessionId,
      ie.CodCarrinho,
      car.Descricao NomeCarrinho,
      car.CodigoBarras CodigoBarrasCarrinho,
      ie.CodProduto,
      prod.Nome NomeProduto,
      ie.CodUnidadeMedida,
      und.Descricao NomeUnidadeMedida,
      prod.CodGrupoProduto,
      gp.Nome NomeGrupoProduto,
      prod.CodMarca,
      m.Nome NomeMarca,
      COALESCE(prod.CodSetorEstoque, 0) CodSetorEstoque,
      se.Descricao NomeSetorEstoque,
      prod.NCM,
      prod.CodigoBarras1 CodigoBarras,
      prod.CodigoBarras2 CodigoBarras2,
      prod.CodigoReferencia,
      prod.CodigoFornecedor,
      prod.CodigoFabricante,
      prod.CodigoOriginal,
      prod.Endereco,
      ie.CodSeparador,
      ie.NomeSeparador,
      ie.DataSeparacao,
      ie.HoraSeparacao,
      ie.Quantidade
    FROM Expedicao.ItemSeparacaoEstoque ie
      LEFT JOIN Expedicao.Carrinho car ON car.CodCarrinho = ie.CodCarrinho
      LEFT JOIN Produto prod ON prod.CodProduto = ie.CodProduto
      LEFT JOIN UnidadeMedida und ON und.CodUnidadeMedida = ie.CodUnidadeMedida
      LEFT JOIN GrupoProduto gp on gp.CodGrupoProduto = prod.CodGrupoProduto
      LEFT JOIN Marca m ON m.CodMarca = prod.CodMarca
      LEFT JOIN Expedicao.SetorEstoque se ON se.CodSetorEstoque = prod.CodSetorEstoque
  ) SeparacaoItemConsulta