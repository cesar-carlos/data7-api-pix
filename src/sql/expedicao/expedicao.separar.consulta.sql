SELECT *
FROM (
    SELECT se.CodEmpresa,
      se.CodSepararEstoque,
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
      se.Historico,
      se.Observacao
    FROM Expedicao.SepararEstoque se
    INNER JOIN Expedicao.TipoOperacaoExpedicao toe ON
		toe.CodEmpresa = se.CodEmpresa
      AND toe.CodTipoOperacaoExpedicao = se.CodTipoOperacaoExpedicao
    INNER JOIN Expedicao.Prioridade pri ON
		pri.CodPrioridade = se.CodPrioridade
  ) SepararConsulta
