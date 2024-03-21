import { Server as SocketIOServer, Socket } from 'socket.io';

import ExpedicaoBasicEventDto from '../../dto/expedicao/expedicao.basic.event.dto';
import EstoqueConversaoUnidadeRepository from './estoque.conversao.unidade.repository';
import EstoqueConversaoUnidadeDto from '../../dto/common.data/estoque.conversao.unidade.dto';
import ExpedicaoBasicErrorEventDto from '../../dto/expedicao/expedicao.basic.error.event.dto';

export default class EstoqueConversaoUnidadeEvent {
  private repository = new EstoqueConversaoUnidadeRepository();

  constructor(
    private readonly io: SocketIOServer,
    private readonly socket: Socket,
  ) {
    const client = socket.id;
    socket.on(`${client} produto.conversao.unidade.consulta`, async (data) => {
      const json = JSON.parse(data);

      const session = json['session'] ?? '';
      const resposeIn = json['resposeIn'] ?? `${client} estoque.produto.conversao.unidade.consulta`;
      const params = json['where'] ?? '';

      try {
        if (params != '') {
          const result = await this.repository.consulta(params);
          const json = result.map((item) => item.toJson());
          socket.emit(resposeIn, JSON.stringify(json));
          return;
        }

        const result = await this.repository.consulta();
        const json = result.map((item) => item.toJson());
        socket.emit(resposeIn, JSON.stringify(json));
      } catch (err: any) {
        const basicEventErro = new ExpedicaoBasicErrorEventDto({
          Session: session,
          ResposeIn: resposeIn,
          Error: [err.message],
        });

        socket.emit(resposeIn, JSON.stringify(basicEventErro.toJson()));
      }
    });

    socket.on(`${client} produto.conversao.unidade.select`, async (data) => {
      const json = JSON.parse(data);
      const session = json['session'] ?? '';
      const resposeIn = json['resposeIn'] ?? `${client} estoque.produto.conversao.unidade.select`;
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
      } catch (err: any) {
        const basicEventErro = new ExpedicaoBasicErrorEventDto({
          Session: session,
          ResposeIn: resposeIn,
          Error: [err.message],
        });

        socket.emit(resposeIn, JSON.stringify(basicEventErro.toJson()));
      }
    });

    socket.on(`${client} produto.conversao.unidade.insert`, async (data) => {
      const json = JSON.parse(data);
      const session = json['session'] ?? '';
      const resposeIn = json['resposeIn'] ?? (`${client} estoque.produto.conversao.unidade.insert` as string);
      const mutation = json['mutation'];

      try {
        const itens = this.convert(mutation);
        for (const el of itens) {
          const sequence = await this.repository.sequence();
          el.CodProduto = sequence?.Valor ?? 0;
          el.Item = await this.lestItem(el.CodProduto);
          await this.repository.insert([el]);
        }

        const basicEvent = new ExpedicaoBasicEventDto({
          Session: session,
          ResposeIn: resposeIn,
          Mutation: itens.map((item) => item.toJson()),
        });

        socket.emit(resposeIn, JSON.stringify(basicEvent.toJson()));
        socket.broadcast.emit('produto.conversao.unidade.insert', JSON.stringify(basicEvent.toJson()));
      } catch (err: any) {
        const basicEventErro = new ExpedicaoBasicErrorEventDto({
          Session: session,
          ResposeIn: resposeIn,
          Error: [err.message],
        });

        socket.emit(resposeIn, JSON.stringify(basicEventErro.toJson()));
      }
    });

    socket.on(`${client} produto.conversao.unidade.update`, async (data) => {
      const json = JSON.parse(data);
      const session = json['session'] ?? '';
      const resposeIn = json['resposeIn'] ?? `${client} estoque.produto.conversao.unidade.update`;
      const mutation = json['mutation'];

      try {
        const itens = this.convert(mutation);
        await this.repository.update(itens);

        const basicEvent = new ExpedicaoBasicEventDto({
          Session: session,
          ResposeIn: resposeIn,
          Mutation: itens.map((item) => item.toJson()),
        });

        socket.emit(resposeIn, JSON.stringify(basicEvent.toJson()));
        socket.broadcast.emit('produto.conversao.unidade.update', JSON.stringify(basicEvent.toJson()));
      } catch (err: any) {
        const basicEventErro = new ExpedicaoBasicErrorEventDto({
          Session: session,
          ResposeIn: resposeIn,
          Error: [err.message],
        });

        socket.emit(resposeIn, JSON.stringify(basicEventErro.toJson()));
      }
    });

    socket.on(`${client} produto.conversao.unidade.delete`, async (data) => {
      const json = JSON.parse(data);
      const session = json['session'] ?? '';
      const resposeIn = json['resposeIn'] ?? `${client} estoque.produto.conversao.unidade.delete`;
      const mutation = json['mutation'];

      try {
        const itens = this.convert(mutation);
        await this.repository.delete(itens);

        const basicEvent = new ExpedicaoBasicEventDto({
          Session: session,
          ResposeIn: resposeIn,
          Mutation: itens.map((item) => item.toJson()),
        });

        socket.emit(resposeIn, JSON.stringify(basicEvent.toJson()));
        socket.broadcast.emit('produto.conversao.unidade.delete', JSON.stringify(basicEvent.toJson()));
      } catch (err: any) {
        const basicEventErro = new ExpedicaoBasicErrorEventDto({
          Session: session,
          ResposeIn: resposeIn,
          Error: [err.message],
        });

        socket.emit(resposeIn, JSON.stringify(basicEventErro.toJson()));
      }
    });
  }

  private convert(mutations: any[] | any): EstoqueConversaoUnidadeDto[] {
    try {
      if (!Array.isArray(mutations)) mutations = [mutations];
      return mutations.map((mutation: any) => {
        return EstoqueConversaoUnidadeDto.fromObject(mutation);
      });
    } catch (error) {
      return [];
    }
  }

  private async lestItem(codProduto: number): Promise<string> {
    const itens = await this.repository.select([{ key: 'CodProduto', value: codProduto }]);
    if (itens.length == 0) return '001';
    const list = itens.map((item) => item.Item);
    const max = Math.max(...list.map((item) => Number(item)));
    return String(max + 1).padStart(3, '0');
  }
}
