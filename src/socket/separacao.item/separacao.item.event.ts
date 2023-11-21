import { Socket } from 'socket.io';

import SeparacaoItemRepository from './separacao.item.repository';
import ExpedicaoItemSeparacaoDto from '../../dto/expedicao/expedicao.item.separacao.dto';
import ExpedicaoItemSeparacaoConsultaDto from '../../dto/expedicao/expedicao.item.separacao.consulta.dto';
import ExpedicaoBasicEventDto from '../../dto/expedicao/expedicao.basic.event.dto';

export default class SeparacaoItemEvent {
  private repository = new SeparacaoItemRepository();

  constructor(private readonly socket: Socket) {
    const client = socket.id;

    socket.on(`${client} separacao.item.consulta`, async (data) => {
      const json = JSON.parse(data);
      const session = json['session'] ?? '';
      const resposeIn = json['resposeIn'] ?? `${client} separacao.item.consulta`;
      const params = json['where'] ?? '';

      try {
        if (params != '') {
          const result = await this.repository.consulta(params);
          const json = result.map((item) => item.toJson());
          socket.emit(resposeIn, JSON.stringify(json));
          return;
        }

        const result = await this.repository.select();
        const json = result.map((item) => item.toJson());
        socket.emit(resposeIn, JSON.stringify(json));
      } catch (error) {
        this.socket.emit(resposeIn, JSON.stringify(error));
      }
    });

    socket.on(`${client} separacao.item.select`, async (data) => {
      const json = JSON.parse(data);
      const session = json['session'] ?? '';
      const resposeIn = json['resposeIn'] ?? `${client} separacao.item.select`;
      const params = json['where'] ?? '';

      try {
        if (params != '') {
          const result = await this.repository.select(params);
          const json = result.map((item) => item.toJson());
          socket.emit(resposeIn, JSON.stringify(json));
          return;
        }

        const result = await this.repository.select();
        const json = result.map((item) => item.toJson());
        socket.emit(resposeIn, JSON.stringify(json));
      } catch (error) {
        this.socket.emit(resposeIn, JSON.stringify(error));
      }
    });

    socket.on(`${client} separacao.item.insert`, async (data) => {
      const json = JSON.parse(data);
      const session = json['session'] ?? '';
      const resposeIn = json['resposeIn'] ?? `${client} separacao.item.insert`;
      const mutation = json['mutation'];

      try {
        const itemSeparacao = this.convert(mutation);
        const lestItem = await this.lestItem(mutation.CodEmpresa, mutation.CodSepararEstoque);

        for (let i = 0; i < itemSeparacao.length; i++) {
          const el = itemSeparacao[i];
          if (el.Item == '') {
            const nextItem = String(Number(lestItem) + i).padStart(5, '0');
            el.Item = nextItem;
          }
        }

        await this.repository.insert(itemSeparacao);

        const itensSeparacaoConsulta: ExpedicaoItemSeparacaoConsultaDto[] = [];
        for (const item of itemSeparacao) {
          const itens = await this.repository.consulta([
            { key: 'CodEmpresa', value: item.CodEmpresa },
            { key: 'CodSepararEstoque', value: item.CodSepararEstoque },
            { key: 'Item', value: item.Item },
          ]);

          itensSeparacaoConsulta.push(...itens);
        }

        const basicEvent = new ExpedicaoBasicEventDto({
          Session: session,
          ResposeIn: resposeIn,
          Mutation: itensSeparacaoConsulta.map((item) => item.toJson()),
        });

        socket.emit(resposeIn, JSON.stringify(json));
        socket.broadcast.emit('broadcast.separacao.item.insert', JSON.stringify(basicEvent.toJson()));
      } catch (error) {
        this.socket.emit(resposeIn, JSON.stringify(error));
      }
    });

    socket.on(`${client} separacao.item.update`, async (data) => {
      const json = JSON.parse(data);
      const session = json['session'] ?? '';
      const resposeIn = json['resposeIn'] ?? `${client} separacao.item.update`;
      const mutation = json['mutation'];

      try {
        const itemSeparacao = this.convert(mutation);
        await this.repository.update(itemSeparacao);
        socket.emit(resposeIn, JSON.stringify(json));

        //socket.broadcast.emit('broadcast.separacao.item.update', JSON.stringify(json));
      } catch (error) {
        this.socket.emit(resposeIn, JSON.stringify(error));
      }
    });

    socket.on(`${client} separacao.item.delete`, async (data) => {
      const json = JSON.parse(data);
      const session = json['session'] ?? '';
      const resposeIn = json['resposeIn'] ?? `${client} separacao.item.delete`;
      const mutation = json['mutation'];

      try {
        await this.repository.delete(this.convert(mutation));
        socket.emit(resposeIn, JSON.stringify(json));
        //socket.broadcast.emit('broadcast.separacao.item.delete', JSON.stringify(json));
      } catch (error) {
        this.socket.emit(resposeIn, JSON.stringify(error));
      }
    });
  }

  private convert(mutations: any[] | any): ExpedicaoItemSeparacaoDto[] {
    try {
      if (!Array.isArray(mutations)) mutations = [mutations];
      return mutations.map((mutation: any) => {
        return ExpedicaoItemSeparacaoDto.fromObject(mutation);
      });
    } catch (error) {
      return [];
    }
  }

  private async lestItem(codEmpresa: number, CodSepararEstoque: number): Promise<string> {
    const itemSeparacaoEstoque = await this.repository.select([
      { key: 'CodEmpresa', value: codEmpresa },
      { key: 'CodSepararEstoque', value: CodSepararEstoque },
    ]);

    if (itemSeparacaoEstoque.length == 0) return '00001';
    const itens = itemSeparacaoEstoque.map((item) => item.Item);
    const max = Math.max(...itens.map((item) => Number(item)));
    return String(max + 1).padStart(5, '0');
  }
}
