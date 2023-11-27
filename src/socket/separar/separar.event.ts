import { Server as SocketIOServer, Socket } from 'socket.io';

import ExpedicaoSepararDto from '../../dto/expedicao/expedicao.separar.dto';
import ExpedicaoBasicEventDto from '../../dto/expedicao/expedicao.basic.event.dto';
import SepararRepository from './separar.repository';

export default class SepararEvent {
  private repository = new SepararRepository();

  constructor(private readonly io: SocketIOServer, private readonly socket: Socket) {
    const client = socket.id;

    socket.on(`${client} separar.consulta`, async (data) => {
      const json = JSON.parse(data);
      const session = json['session'] ?? '';
      const resposeIn = json['resposeIn'] ?? `${client} separar.consulta`;
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
        socket.emit(resposeIn, JSON.stringify(error));
      }
    });

    socket.on(`${client} separar.select`, async (data) => {
      const json = JSON.parse(data);
      const session = json['session'] ?? '';
      const resposeIn = json['resposeIn'] ?? `${client} separar.select`;
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
        console.log(json);
        socket.emit(resposeIn, JSON.stringify(json));
      } catch (error) {
        socket.emit(resposeIn, JSON.stringify(error));
      }
    });

    socket.on(`${client} separar.insert`, async (data) => {
      const json = JSON.parse(data);
      const session = json['session'] ?? '';
      const resposeIn = json['resposeIn'] ?? `${client} separar.insert`;
      const mutation = json['mutation'];

      try {
        const itens = this.convert(mutation);
        for (const item of itens) {
          const sequence = await this.repository.sequence();
          item.CodSepararEstoque = sequence?.Valor ?? 0;
          await this.repository.insert([item]);
        }

        const basicEvent = new ExpedicaoBasicEventDto({
          Session: session,
          ResposeIn: resposeIn,
          Mutation: itens.map((item) => item.toJson()),
        });

        socket.emit(resposeIn, JSON.stringify(basicEvent.toJson()));
        socket.broadcast.emit('separar.insert', JSON.stringify(basicEvent.toJson()));
      } catch (error) {
        socket.emit(resposeIn, JSON.stringify(error));
      }
    });

    socket.on(`${client} separar.update`, async (data) => {
      const json = JSON.parse(data);
      const session = json['session'] ?? '';
      const resposeIn = json['resposeIn'] ?? `${client} separar.update`;
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
        socket.broadcast.emit('separar.update', JSON.stringify(basicEvent.toJson()));
      } catch (error) {
        socket.emit(resposeIn, JSON.stringify(error));
      }
    });

    socket.on(`${client} separar.delete`, async (data) => {
      const json = JSON.parse(data);
      const session = json['session'] ?? '';
      const resposeIn = json['resposeIn'] ?? `${client} separar.delete`;
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
        socket.broadcast.emit('separar.delete', JSON.stringify(basicEvent.toJson()));
      } catch (error) {
        socket.emit(resposeIn, JSON.stringify(error));
      }
    });
  }

  private convert(mutations: any[] | any): ExpedicaoSepararDto[] {
    try {
      if (!Array.isArray(mutations)) mutations = [mutations];
      return mutations.map((mutation: any) => {
        return ExpedicaoSepararDto.fromObject(mutation);
      });
    } catch (error) {
      return [];
    }
  }
}
