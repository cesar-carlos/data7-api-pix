import { Socket } from 'socket.io';

import SepararItemRepository from './separar.item.repository';
import ExpedicaoItemSepararDto from '../../dto/expedicao/expedicao.item.separar.dto';

export default class SepararItemEvent {
  private repository = new SepararItemRepository();

  constructor(private readonly socket: Socket) {
    const client = socket.id;

    socket.on(`${client} separar.item.consulta`, async (data) => {
      const json = JSON.parse(data);
      const session = json['session'] ?? '';
      const resposeIn = json['resposeIn'] ?? `${client} separar.item.consulta`;
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

    socket.on(`${client} separar.item.select`, async (data) => {
      const json = JSON.parse(data);
      const session = json['session'] ?? '';
      const resposeIn = json['resposeIn'] ?? `${client} separar.item.select`;
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

    socket.on(`${client} separar.item.insert`, (data) => {
      const json = JSON.parse(data);
      const session = json['session'] ?? '';
      const resposeIn = json['resposeIn'] ?? `${client} separar.item.insert`;
      const mutation = json['mutation'];

      try {
        this.repository.insert(this.convert(mutation));
        socket.emit(resposeIn, JSON.stringify(json));
        //socket.broadcast.emit('broadcast.separar.item.insert', JSON.stringify(json));
      } catch (error) {
        this.socket.emit(resposeIn, JSON.stringify(error));
      }
    });

    socket.on(`${client} separar.item.update`, async (data) => {
      const json = JSON.parse(data);
      const session = json['session'] ?? '';
      const resposeIn = json['resposeIn'] ?? `${client} separar.item.update`;
      const mutation = json['mutation'];

      try {
        await this.repository.update(this.convert(mutation));
        socket.emit(resposeIn, JSON.stringify(json));
        //socket.broadcast.emit('broadcast.separar.item.update', JSON.stringify(json));
      } catch (error) {
        this.socket.emit(resposeIn, JSON.stringify(error));
      }
    });

    socket.on(`${client} separar.item.delete`, (data) => {
      const json = JSON.parse(data);
      const session = json['session'] ?? '';
      const resposeIn = json['resposeIn'] ?? `${client} separar.item.delete`;
      const mutation = json['mutation'];

      try {
        this.repository.delete(this.convert(mutation));
        socket.emit(resposeIn, JSON.stringify(json));
        //socket.broadcast.emit('broadcast.separar.item.delete', JSON.stringify(json));
      } catch (error) {
        this.socket.emit(resposeIn, JSON.stringify(error));
      }
    });
  }

  private convert(mutations: any[] | any): ExpedicaoItemSepararDto[] {
    try {
      if (!Array.isArray(mutations)) mutations = [mutations];
      return mutations.map((mutation: any) => {
        return ExpedicaoItemSepararDto.fromObject(mutation);
      });
    } catch (error) {
      return [];
    }
  }
}
