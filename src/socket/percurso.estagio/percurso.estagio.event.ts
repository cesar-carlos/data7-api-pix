import { Socket } from 'socket.io';

import CarrinhoRepository from './percurso.estagio.repository';
import ExpedicaoPercursoEstagioDto from '../../dto/expedicao/expedicao.percurso.estagio.dto';

export default class PercursoEstagioEvent {
  private repository = new CarrinhoRepository();

  constructor(private readonly socket: Socket) {
    const client = socket.id;

    socket.on(`${client} percurso.estagio.select`, async (data) => {
      const json = JSON.parse(data);
      const session = json['session'] ?? '';
      const resposeIn = json['resposeIn'] ?? `${client} percurso.estagio.select`;
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

    socket.on(`${client} percurso.estagio.insert`, async (data) => {
      const json = JSON.parse(data);
      const session = json['session'] ?? '';
      const resposeIn = json['resposeIn'] ?? `${client} percurso.estagio.insert`;
      const mutation = json['mutation'];

      try {
        await this.repository.insert(this.convert(mutation));
        socket.emit(resposeIn, JSON.stringify(data));
        //socket.broadcast.emit('broadcast.percurso.estagio.insert', JSON.stringify(json));
      } catch (error) {
        this.socket.emit(resposeIn, JSON.stringify(error));
      }
    });

    socket.on(`${client} percurso.estagio.update`, async (data) => {
      const json = JSON.parse(data);
      const session = json['session'] ?? '';
      const resposeIn = json['resposeIn'] ?? `${client} percurso.estagio.update`;
      const mutation = json['mutation'];

      try {
        await this.repository.update(this.convert(mutation));
        socket.emit(resposeIn, JSON.stringify(data));
        //socket.broadcast.emit('broadcast.percurso.estagio.update', JSON.stringify(json));
      } catch (error) {
        this.socket.emit(resposeIn, JSON.stringify(error));
      }
    });

    socket.on(`${client} percurso.estagio.delete`, async (data) => {
      const json = JSON.parse(data);
      const session = json['session'] ?? '';
      const resposeIn = json['resposeIn'] ?? `${client} percurso.estagio.delete`;
      const mutation = json['mutation'];

      try {
        await this.repository.delete(this.convert(mutation));
        socket.emit(resposeIn, JSON.stringify(data));
        //socket.broadcast.emit('broadcast.percurso.estagio.delete', JSON.stringify(json));
      } catch (error) {
        this.socket.emit(resposeIn, JSON.stringify(error));
      }
    });
  }

  private convert(mutations: any[] | any): ExpedicaoPercursoEstagioDto[] {
    try {
      if (!Array.isArray(mutations)) mutations = [mutations];
      return mutations.map((mutation: any) => {
        return ExpedicaoPercursoEstagioDto.fromObject(mutation);
      });
    } catch (error) {
      return [];
    }
  }
}
