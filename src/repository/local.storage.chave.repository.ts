import path from 'path';
import { LocalStorage } from 'node-localstorage';
import LocalBaseRepositoryContract, { params, param } from '../contracts/local.base.repository.contract';
import ChaveDto from '../dto/chave.dto';

export default class LocalStorageChaveRepository implements LocalBaseRepositoryContract<ChaveDto> {
  private path = path.resolve(__dirname, '..', '..', 'local.storage');
  private storage = new LocalStorage(this.path);
  private colection = 'chaves';

  constructor() {}
  async select(): Promise<ChaveDto[] | undefined> {
    const result = this.storage.getItem(this.colection);
    if (!result) return undefined;
    const chavesJson = JSON.parse(result);
    const chaves = chavesJson.map((item: any) => {
      return ChaveDto.fromJson(item);
    });

    return chaves;
  }

  async selectWhere(params: params[]): Promise<ChaveDto[] | undefined> {
    throw new Error('Method not implemented.');
  }

  async insert(entity: ChaveDto): Promise<void> {
    const chavesJson = this.storage.getItem(this.colection);
    const chaves = chavesJson ? JSON.parse(chavesJson) : [];
    chaves.push(entity);
    this.storage.removeItem(this.colection);
    this.storage.setItem(this.colection, JSON.stringify(chaves));
  }

  async update(entity: ChaveDto): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async delete(entity: ChaveDto): Promise<void> {
    const result = this.storage.getItem(this.colection);
    if (!result) return;

    const chavesJson = JSON.parse(result);
    const chaves: ChaveDto[] = chavesJson.map((item: any) => {
      return ChaveDto.fromJson(item);
    });

    const newChave = chaves.filter((item: ChaveDto) => item.uuid != entity.uuid);
    this.storage.removeItem(this.colection);

    if (newChave.length > 0) {
      this.storage.setItem(this.colection, JSON.stringify(newChave));
    }
  }
}
