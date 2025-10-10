SELECT *
FROM (
    SELECT
      se.CodEmpresa,
      se.CodSepararEstoque,
      se.Origem,
      se.CodOrigem,
      se.CodTipoOperacaoExpedicao,
      toe.Descricao NomeTipoOperacaoExpedicao,
      se.Situacao,
      se.TipoEntidade,
      se.Data DataEmissao,
      se.Hora HoraEmissao,
      se.CodEntidade,
      se.NomeEntidade,
      se.CodPrioridade,
      pri.Descricao NomePrioridade,
	 (SELECT STRING_AGG(sub.CodSetorEstoque, ',')
	  FROM(SELECT CodSetorEstoque
		   FROM Expedicao.ItemSepararEstoque seise
		   WHERE seise.CodEmpresa = se.CodEmpresa
		     AND seise.CodSepararEstoque = se.CodSepararEstoque
		   GROUP BY CodEmpresa, CodSepararEstoque,CodSetorEstoque
		) sub
	 )CodSetoresEstoque,
      se.Historico,
      se.Observacao
    FROM Expedicao.SepararEstoque se
    INNER JOIN Expedicao.TipoOperacaoExpedicao toe ON
		toe.CodEmpresa = se.CodEmpresa
      AND toe.CodTipoOperacaoExpedicao = se.CodTipoOperacaoExpedicao
    INNER JOIN Expedicao.Prioridade pri ON
		pri.CodPrioridade = se.CodPrioridade
  ) SepararConsulta



