import Cobranca from '../model/cobranca';
import IBaseRepository from './IBase.repository';

export default class FakeRepository implements IBaseRepository<Cobranca> {
  db: Cobranca[] = [];

  constructor() {
    this.initialize();
  }

  readonly initialize = (): void => {
    const fakeRepository = require('../assets/open.cobranca.json');
    this.cobrancaFromJson(fakeRepository.Data);
  };

  cobrancaFromJson(json: any[]): void {
    json.forEach((cobranca: any) => {
      this.db.push(Cobranca.fromJson(cobranca));
    });
  }

  async getAll(): Promise<Cobranca[]> {
    return this.db;
  }

  async getById(id: string): Promise<Cobranca | undefined> {
    return this.db.find((cobranca: Cobranca) => cobranca.id === id);
  }

  async create(entity: Cobranca): Promise<void> {
    this.db.push(entity);
  }

  //metodo not tested
  async update(entity: Cobranca): Promise<void> {
    const index = this.db.findIndex(
      (cobranca: Cobranca) => cobranca.id === entity.id
    );

    if (index !== -1) this.db[index] = entity;
    if (index === -1) throw new Error('Cobranca não encontrada');
  }
}
