import { params } from '../contracts/local.base.repository.contract';
import { liberacaoKeyDto } from '../dto/liberacao.key.dto';
import { ProcessInfoStatusType } from '../type/process.info.status.type';

import LocalBaseRepositoryContract from '../contracts/local.base.repository.contract';
import LiberacaoBloqueioDto from '../dto/liberacao.bloqueio.dto';
import ItemLiberacaoBloqueioDto from '../dto/item.liberacao.bloqueio.dto';
import ItemLiberacaoBloqueioSituacaoDto from '../dto/item.liberacao.bloqueio.situacao.dto';
import LiberacaoBloqueio from '../entities/liberacao.bloqueio';
import ProcessInfo from '../entities/process.info';

export default class RegraBloqueioService {
  constructor(
    private repoLiberacao: LocalBaseRepositoryContract<LiberacaoBloqueioDto>,
    private repoItemLiberacao: LocalBaseRepositoryContract<ItemLiberacaoBloqueioDto>,
    private repoItemLiberacaoSituacao: LocalBaseRepositoryContract<ItemLiberacaoBloqueioSituacaoDto>,
  ) {}

  public async findOne(CodEmpresa: number, CodLiberacao: number): Promise<LiberacaoBloqueio | undefined> {
    try {
      const paramCodEmpresa = params.create<number>('CodEmpresa', CodEmpresa);
      const paramCodLiberacao = params.create<number>('CodLiberacaoBloqueio', CodLiberacao);

      const liberacaoBloqueioDto = await this.repoLiberacao.selectWhere([paramCodEmpresa, paramCodLiberacao]);
      if (!liberacaoBloqueioDto) return undefined;

      const itemLiberacaoBloqueioDto = await this.repoItemLiberacao.selectWhere([paramCodLiberacao]);
      const itemLiberacaoBloqueioSituacaoDto = await this.repoItemLiberacaoSituacao.selectWhere([paramCodLiberacao]);
      const liberacaoBloqueio = { ...liberacaoBloqueioDto.shift() };
      const itemLiberacaoBloqueio = itemLiberacaoBloqueioDto!.map((itemBloqueio: any) => {
        return { ...itemBloqueio };
      });

      const itemLiberacaoBloqueioSituacao = itemLiberacaoBloqueioSituacaoDto!.map((itemSituacao: any) => {
        return { ...itemSituacao };
      });

      const obj = {
        ...liberacaoBloqueio,
        itemLiberacaoBloqueio,
        itemLiberacaoBloqueioSituacao,
      };

      return LiberacaoBloqueio.fromObject(obj);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async findOneFromLiberacaoKey(LiberacaoKey: liberacaoKeyDto): Promise<LiberacaoBloqueio | ProcessInfo> {
    try {
      const _stringLiberacaoKey = `${JSON.stringify(LiberacaoKey)}`;
      const paramObservacaoBloqueio = params.create<string>('ObservacaoBloqueio', _stringLiberacaoKey);
      const itemLiberacaoDto = await this.repoItemLiberacao.selectWhere([paramObservacaoBloqueio]);
      const infoStatusErro: ProcessInfoStatusType = { status: 'error' };

      if (!itemLiberacaoDto)
        return new ProcessInfo(
          infoStatusErro,
          'RegraBloqueioService method: findOneFromLiberacaoKey',
          '(itemLiberacaoBloquio) Nenhum registro encontrado',
        );

      const CodEmpresa = LiberacaoKey.CodEmpresa;
      const CodLiberacao = itemLiberacaoDto.shift()?.codLiberacaoBloqueio;

      if (!CodLiberacao) {
        return new ProcessInfo(infoStatusErro, 'RegraBloqueioService', '(LiberacaoBloquio) Nenhum registro encontrado');
      }

      const liberacaoBloqueio = await this.findOne(CodEmpresa, CodLiberacao);

      if (!liberacaoBloqueio) {
        return new ProcessInfo(
          infoStatusErro,
          'RegraBloqueioService method: findOneFromLiberacaoKey',
          '(LiberacaoBloquio) Nenhum registro encontrado',
        );
      }

      return liberacaoBloqueio;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async create(LiberacaoBloqueio: LiberacaoBloqueio): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public async update(LiberacaoBloqueio: LiberacaoBloqueio): Promise<void> {
    try {
      const liberacaoDto = LiberacaoBloqueioDto.fromObject({ ...LiberacaoBloqueio });
      const itemLiberacaoDto = LiberacaoBloqueio.itemLiberacaoBloqueio.map((itemBloqueio: any) => {
        return ItemLiberacaoBloqueioDto.fromObject({ ...itemBloqueio });
      });

      const itemLiberacaoSituacaoDto = LiberacaoBloqueio.itemLiberacaoBloqueioSituacao?.map((itemSituacao: any) => {
        return ItemLiberacaoBloqueioSituacaoDto.fromObject({ ...itemSituacao });
      });

      this.repoLiberacao.update(liberacaoDto);
      itemLiberacaoDto.forEach((item: any) => {
        this.repoItemLiberacao.update(item);
      });

      itemLiberacaoSituacaoDto?.forEach((item: any) => {
        this.repoItemLiberacaoSituacao.update(item);
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async setSituacao(liberacao: ItemLiberacaoBloqueioSituacaoDto): Promise<void> {
    this.repoItemLiberacaoSituacao.update(liberacao);
  }

  public async delete(CodEmpresa: number, CodLiberacao: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
