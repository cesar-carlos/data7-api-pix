import Cobranca from '../model/cobranca';
import IBaseRepository from './IBase.repository';

export default class FakeRepository implements IBaseRepository<Cobranca> {
  db: Cobranca[] = [];

  constructor() {
    this.initialize();
  }

  private initialize = (): void => {
    const fakeRepository = require('../assets/open.cobranca.json');
    this.cobrancaFromJson(fakeRepository.Data);
  };

  private cobrancaFromJson(json: any[]): void {
    json.forEach((cobranca: any) => {
      this.db.push(Cobranca.fromJson(cobranca));
    });
  }

  async getAll(cnpj: string): Promise<Cobranca[] | undefined> {
    const _cobrancas = this.db.filter(
      (cobranca: Cobranca) => cobranca.filial.cnpj === cnpj,
    );

    return _cobrancas;
  }

  async getById(cnpj: string, id: string): Promise<Cobranca | undefined> {
    if (!cnpj || !id) throw new Error('CNPJ OR ID IS NULL');

    const _cobrancas = this.db.filter(
      (cobranca: Cobranca) => cobranca.filial.cnpj === cnpj,
    );

    const _cobranca = _cobrancas.find(
      (cobranca: Cobranca) => cobranca.id === id,
    );

    return _cobranca;
  }

  //todo: implement
  async getByIdDate(
    cnpj: string,
    date: string,
    id: string,
  ): Promise<Cobranca | undefined> {
    throw new Error('Method not implemented.');
  }

  async create(entity: Cobranca): Promise<void> {
    this.db.push(entity);
  }

  async update(entity: Cobranca): Promise<void> {
    const index = this.db.findIndex(
      (cobranca: Cobranca) => cobranca.id === entity.id,
    );

    if (index !== -1) this.db[index] = entity;
    if (index === -1) throw new Error('COBRANCA NOT FOUND');
  }
}
