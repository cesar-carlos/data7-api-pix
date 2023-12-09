SELECT *
FROM (
    SELECT cf.CodEmpresa,
      cf.CodConferir,
      cf.Origem,
      cf.CodOrigem,
      cf.CodPrioridade,
      pri.Descricao NomePrioridade,
      cf.Situacao,
      cf.Data,
      cf.Hora,
      cf.Historico,
      cf.Observacao
    FROM Expedicao.Conferir cf
      INNER JOIN Expedicao.Prioridade pri ON pri.CodPrioridade = cf.CodPrioridade
  ) ConferirConsulta