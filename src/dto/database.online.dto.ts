export default class DatabaseOnlineDto {
  base: string;
  versao: string;

  constructor(params: { base: string; versao: string }) {
    this.base = params.base;
    this.versao = params.versao;
  }

  static create(params: { base: string; versao: string }) {
    return new DatabaseOnlineDto(params);
  }

  static fromObject(object: any) {
    return new DatabaseOnlineDto({
      base: object.base || object.Base,
      versao: object.versao || object.Versao,
    });
  }
}
