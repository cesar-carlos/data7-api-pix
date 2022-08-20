DELETE integracao.CobrancaDigital
WHERE SysId = @SysId
  AND CodEmpresa = @CodEmpresa
  AND CodFilial = @CodFilial
  AND CodCobrancaDigital = @CodCobrancaDigital
