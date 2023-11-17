import { Socket } from 'socket.io';

import CancelamentoRepository from './cancelamento.repository';
import ExpedicaoCancelamentoDto from '../../dto/expedicao/expedicao.cancelamento.dto';

export default class CancelamentoEvent {
  private repository = new CancelamentoRepository();

  constructor(private readonly socket: Socket) {
    const client = socket.id;

    socket.on(`${client} cancelamento.select`, async (data) => {
      const json = JSON.parse(data);
      const session = json['session'] ?? '';
      const resposeIn = json['resposeIn'] ?? `${client} cancelamento.select`;
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

    socket.on(`${client} cancelamento.insert`, async (data) => {
      const json = JSON.parse(data);
      const session = json['session'] ?? '';
      const resposeIn = json['resposeIn'] ?? `${client} cancelamento.insert`;
      const mutation = json['mutation'];

      try {
        await this.repository.insert(this.convert(mutation));
        socket.emit(resposeIn, JSON.stringify(json));
        socket.broadcast.emit('broadcast.cancelamento.insert', JSON.stringify(json));
      } catch (error) {
        this.socket.emit(resposeIn, JSON.stringify(error));
      }
    });

    socket.on(`${client} cancelamento.update`, async (data) => {
      const json = JSON.parse(data);
      const session = json['session'] ?? '';
      const resposeIn = json['resposeIn'] ?? `${client} cancelamento.update`;
      const mutation = json['mutation'];

      try {
        await this.repository.update(this.convert(mutation));
        socket.emit(resposeIn, JSON.stringify(json));
        socket.broadcast.emit('broadcast.cancelamento.update', JSON.stringify(json));
      } catch (error) {
        this.socket.emit(resposeIn, JSON.stringify(error));
      }
    });

    socket.on(`${client} cancelamento.delete`, async (data) => {
      const json = JSON.parse(data);
      const session = json['session'] ?? '';
      const resposeIn = json['resposeIn'] ?? `${client} cancelamento.delete`;
      const mutation = json['mutation'];

      try {
        await this.repository.delete(this.convert(mutation));
        socket.emit(resposeIn, JSON.stringify(json));
        socket.broadcast.emit('broadcast.cancelamento.delete', JSON.stringify(json));
      } catch (error) {
        this.socket.emit(resposeIn, JSON.stringify(error));
      }
    });
  }

  private convert(mutations: any[] | any): ExpedicaoCancelamentoDto[] {
    try {
      if (!Array.isArray(mutations)) mutations = [mutations];
      return mutations.map((mutation: any) => {
        return ExpedicaoCancelamentoDto.fromObject(mutation);
      });
    } catch (error) {
      return [];
    }
  }
}
