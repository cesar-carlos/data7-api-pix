UPDATE Expedicao.PercursoEstagio
SET Descricao = @Descricao,
  Ativo = @Ativo,
  Sigla = @Sigla,
  Sequencia = @Sequencia
WHERE CodPercursoEstagio = @CodPercursoEstagio