export default class DemoDto {
  readonly id: number;
  readonly nome: string;

  constructor(params: { id: number; nome: string }) {
    this.id = params.id;
    this.nome = params.nome;
  }

  static create(params: { id: number; nome: string }) {
    return new DemoDto(params);
  }

  static fromObject(object: any) {
    return new DemoDto({
      id: object.id || object.Id,
      nome: object.nome || object.Nome,
    });
  }
}
