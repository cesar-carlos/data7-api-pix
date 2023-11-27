import { Server as SocketIOServer, Socket } from 'socket.io';

import CarrinhoPercursoEstagioRepository from './carrinho.percurso.estagio.repository';
import ExpedicaoCarrinhoPercursoEstagioDto from '../../dto/expedicao/expedicao.carrinho.percurso.estagio.dto';
import ExpedicaoCarrinhoPercursoConsultaDto from '../../dto/expedicao/expedicao.carrinho.percurso.consulta.dto';
import ExpedicaoBasicEventDto from '../../dto/expedicao/expedicao.basic.event.dto';

export default class CarrinhoPercursoEstagioEvent {
  private repository = new CarrinhoPercursoEstagioRepository();

  constructor(private readonly io: SocketIOServer, private readonly socket: Socket) {
    const client = socket.id;
    socket.on(`${client} carrinho.percurso.estagio.consulta`, async (data) => {
      const json = JSON.parse(data);
      const session = json['session'] ?? '';
      const resposeIn = json['resposeIn'] ?? `${client} carrinho.percurso.estagio.consulta`;
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

    socket.on(`${client} carrinho.percurso.estagio.select`, async (data) => {
      const json = JSON.parse(data);
      const session = json['session'] ?? '';
      const resposeIn = json['resposeIn'] ?? `${client} carrinho.percurso.estagio.select`;
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
        socket.emit(resposeIn, JSON.stringify(error));
      }
    });

    socket.on(`${client} carrinho.percurso.estagio.insert`, async (data) => {
      const json = JSON.parse(data);
      const session = json['session'] ?? '';
      const resposeIn = json['resposeIn'] ?? (`${client} carrinho.percurso.estagio.insert` as string);
      const mutation = json['mutation'];

      try {
        const itens = this.convert(mutation);
        for (const item of itens) {
          item.Item = await this.lestItem(item.CodEmpresa, item.CodCarrinhoPercurso);
          await this.repository.insert([item]);
        }

        const percursoConsulta = await this.carrinhoPercursoConsulta(itens);

        const basicEvent = new ExpedicaoBasicEventDto({
          Session: session,
          ResposeIn: resposeIn,
          Mutation: itens.map((item) => item.toJson()),
        });

        const basicEventConsulta = new ExpedicaoBasicEventDto({
          Session: session,
          ResposeIn: resposeIn,
          Mutation: percursoConsulta.map((item) => item.toJson()),
        });

        socket.emit(resposeIn, JSON.stringify(basicEvent.toJson()));
        socket.broadcast.emit('carrinho.percurso.estagio.insert', JSON.stringify(basicEvent.toJson()));
        io.emit('carrinho.percurso.estagio.insert.listen', JSON.stringify(basicEventConsulta.toJson()));
      } catch (error) {
        socket.emit(resposeIn, JSON.stringify(error));
      }
    });

    socket.on(`${client} carrinho.percurso.estagio.update`, async (data) => {
      const json = JSON.parse(data);
      const session = json['session'] ?? '';
      const resposeIn = json['resposeIn'] ?? `${client} carrinho.percurso.estagio.update`;
      const mutation = json['mutation'];

      try {
        const itens = this.convert(mutation);
        await this.repository.update(itens);
        const percursoConsulta = await this.carrinhoPercursoConsulta(itens);

        const basicEvent = new ExpedicaoBasicEventDto({
          Session: session,
          ResposeIn: resposeIn,
          Mutation: itens.map((item) => item.toJson()),
        });

        const basicEventConsulta = new ExpedicaoBasicEventDto({
          Session: session,
          ResposeIn: resposeIn,
          Mutation: percursoConsulta.map((item) => item.toJson()),
        });

        socket.emit(resposeIn, JSON.stringify(basicEvent.toJson()));
        socket.broadcast.emit('carrinho.percurso.estagio.update', JSON.stringify(basicEvent.toJson()));
        io.emit('carrinho.percurso.estagio.update.listen', JSON.stringify(basicEventConsulta.toJson()));
      } catch (error) {
        socket.emit(resposeIn, JSON.stringify(error));
      }
    });

    socket.on(`${client} carrinho.percurso.estagio.delete`, async (data) => {
      const json = JSON.parse(data);
      const session = json['session'] ?? '';
      const resposeIn = json['resposeIn'] ?? `${client} carrinho.percurso.estagio.delete`;
      const mutation = json['mutation'];

      try {
        const itens = this.convert(mutation);
        await this.repository.delete(itens);
        const percursoConsulta = await this.carrinhoPercursoConsulta(itens);

        const basicEvent = new ExpedicaoBasicEventDto({
          Session: session,
          ResposeIn: resposeIn,
          Mutation: itens.map((item) => item.toJson()),
        });

        const basicEventConsulta = new ExpedicaoBasicEventDto({
          Session: session,
          ResposeIn: resposeIn,
          Mutation: percursoConsulta.map((item) => item.toJson()),
        });

        socket.emit(resposeIn, JSON.stringify(basicEvent.toJson()));
        socket.broadcast.emit('carrinho.percurso.estagio.delete', JSON.stringify(basicEvent.toJson()));
        io.emit('carrinho.percurso.estagio.delete.listen', JSON.stringify(basicEventConsulta.toJson()));
      } catch (error) {
        socket.emit(resposeIn, JSON.stringify(error));
      }
    });
  }

  private async carrinhoPercursoConsulta(
    carrinhoEstagios: ExpedicaoCarrinhoPercursoEstagioDto[],
  ): Promise<ExpedicaoCarrinhoPercursoConsultaDto[]> {
    const carrinhoPercursoConsulta: ExpedicaoCarrinhoPercursoConsultaDto[] = [];

    for (const el of carrinhoEstagios) {
      const params = [
        { key: 'CodEmpresa', value: el.CodEmpresa },
        { key: 'CodCarrinhoPercurso', value: el.CodCarrinhoPercurso },
        { key: 'CodPercursoEstagio', value: el.CodPercursoEstagio },
        { key: 'CodCarrinho', value: el.CodCarrinho },
        { key: 'Item', value: el.Item },
      ];

      const cars = await this.repository.consulta(params);
      carrinhoPercursoConsulta.push(...cars);
    }

    return carrinhoPercursoConsulta;
  }

  private convert(mutations: any[] | any): ExpedicaoCarrinhoPercursoEstagioDto[] {
    try {
      if (!Array.isArray(mutations)) mutations = [mutations];
      return mutations.map((mutation: any) => {
        return ExpedicaoCarrinhoPercursoEstagioDto.fromObject(mutation);
      });
    } catch (error) {
      return [];
    }
  }

  private async lestItem(codEmpresa: number, codCarrinhoPercurso: number): Promise<string> {
    const itens = await this.repository.select([
      { key: 'CodEmpresa', value: codEmpresa },
      { key: 'CodCarrinhoPercurso', value: codCarrinhoPercurso },
    ]);

    if (itens.length == 0) return '00001';
    const list = itens.map((item) => item.Item);
    const max = Math.max(...list.map((item) => Number(item)));
    return String(max + 1).padStart(5, '0');
  }
}
