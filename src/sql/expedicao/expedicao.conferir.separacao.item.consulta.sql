SELECT *
FROM (
    SELECT ise.CodEmpresa,
      ise.CodSepararEstoque,
      ise.CodCarrinhoPercurso,
      ise.ItemCarrinhoPercurso,
      cpe.Situacao,
      cp.Origem,
      cp.CodOrigem,
      se.CodPrioridade,
      prio.Descricao NomePrioridade,
      cpe.CodCarrinho,
      cart.Descricao NomeCarrinho,
      cart.CodigoBarras CodigoBarrasCarrinho,
      cart.Situacao SituacaoCarrinho,
      ise.CodProduto,
      prod.Nome NomeProduto,
      ise.CodUnidadeMedida,
      und.Descricao NomeUnidadeMedida,
      prod.CodGrupoProduto,
      gp.Nome NomeGrupoProduto,
      prod.CodMarca,
      m.Nome NomeMarca,
      COALESCE(prod.CodSetorEstoque, 0) CodSetorEstoque,
      st.Descricao NomeSetorEstoque,
      prod.NCM,
      prod.CodigoBarras1 CodigoBarras,
      prod.CodigoBarras2 CodigoBarras2,
      prod.CodigoReferencia,
      prod.CodigoFornecedor,
      prod.CodigoFabricante,
      prod.CodigoOriginal,
      prod.Endereco,
      pe.Descricao EnderecoDescricao,
      SUM(COALESCE(ise.Quantidade, 0)) QuantidadeSeparacao
    FROM Expedicao.ItemSeparacaoEstoque ise
      INNER JOIN Expedicao.SepararEstoque se ON se.CodEmpresa = ise.CodEmpresa
      AND se.CodSepararEstoque = ise.CodSepararEstoque
      LEFT JOIN Expedicao.Prioridade prio ON prio.CodPrioridade = se.CodPrioridade
      INNER JOIN Expedicao.CarrinhoPercursoEstagio cpe ON cpe.CodEmpresa = ise.CodEmpresa
      AND cpe.CodCarrinhoPercurso = ise.CodCarrinhoPercurso
      AND cpe.Item = ise.ItemCarrinhoPercurso
      INNER JOIN Expedicao.CarrinhoPercurso cp ON cp.CodEmpresa = ise.CodEmpresa
      AND cp.CodCarrinhoPercurso = ise.CodCarrinhoPercurso
      INNER JOIN Expedicao.Carrinho cart ON cart.CodEmpresa = cpe.CodEmpresa
      AND cart.CodCarrinho = cpe.CodCarrinho
      INNER JOIN Produto prod ON prod.CodProduto = ise.CodProduto
      LEFT JOIN ProdutoEndereco pe ON pe.CodProdutoEndereco = prod.Endereco
      INNER JOIN UnidadeMedida und ON und.CodUnidadeMedida = prod.CodUnidadeMedida
      LEFT JOIN GrupoProduto gp on gp.CodGrupoProduto = prod.CodGrupoProduto
      LEFT JOIN Marca m ON m.CodMarca = prod.CodMarca
      LEFT JOIN Expedicao.SetorEstoque st ON st.CodSetorEstoque = prod.CodSetorEstoque
    GROUP BY ise.CodEmpresa,
      ise.CodSepararEstoque,
      ise.CodCarrinhoPercurso,
      ise.ItemCarrinhoPercurso,
      cpe.Situacao,
      cp.Origem,
      cp.CodOrigem,
      se.CodPrioridade,
      prio.Descricao,
      cpe.CodCarrinho,
      cart.Descricao,
      cart.CodigoBarras,
      cart.Situacao,
      ise.CodProduto,
      prod.Nome,
      ise.CodUnidadeMedida,
      und.Descricao,
      prod.CodGrupoProduto,
      gp.Nome,
      prod.CodMarca,
      m.Nome,
      prod.CodSetorEstoque,
      st.Descricao,
      prod.NCM,
      prod.CodigoBarras1,
      prod.CodigoBarras2,
      prod.CodigoReferencia,
      prod.CodigoFornecedor,
      prod.CodigoFabricante,
      prod.CodigoOriginal,
      prod.Endereco,
      pe.Descricao
  ) ConferirSeparacaoItemConsulta