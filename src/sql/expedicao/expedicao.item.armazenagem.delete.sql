DELETE Expedicao.ItemArmazenagem
WHERE CodEmpresa = @CodEmpresa
  AND CodArmazenagem = @CodArmazenagem
  AND Item = @Item
