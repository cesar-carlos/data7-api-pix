export default class Webhook {
  constructor(readonly cnpj_cpf: string, readonly chave: string, readonly webhookUrl: string, readonly criacao: Date) {}
}
