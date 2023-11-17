import { Socket } from 'socket.io';

import CarrinhoPercursoEstagioRepository from './carrinho.percurso.estagio.repository';
import ExpedicaoCarrinhoPercursoEstagioDto from '../../dto/expedicao/expedicao.carrinho.percurso.estagio.dto';
import ExpedicaoCarrinhoPercursoConsultaDto from '../../dto/expedicao/expedicao.carrinho.percurso.consulta.dto';
import ExpedicaoBasicEventDto from '../../dto/expedicao/expedicao.basic.event.dto';

export default class CarrinhoPercursoEstagioEvent {
  private repository = new CarrinhoPercursoEstagioRepository();

  constructor(private readonly socket: Socket) {
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
        this.socket.emit(resposeIn, JSON.stringify(error));
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
        this.socket.emit(resposeIn, JSON.stringify(error));
      }
    });

    socket.on(`${client} carrinho.percurso.estagio.insert`, async (data) => {
      const json = JSON.parse(data);
      const session = json['session'] ?? '';
      const resposeIn = json['resposeIn'] ?? (`${client} carrinho.percurso.estagio.insert` as string);
      const mutation = json['mutation'];

      try {
        const carrinhoEstagios = this.convert(mutation);
        const lestItem = await this.lestItem(mutation.CodEmpresa, mutation.CodCarrinhoPercurso);
        for (let i = 0; i < carrinhoEstagios.length; i++) {
          const el = carrinhoEstagios[i];
          if (el.Item == '') {
            const nextItem = String(Number(lestItem) + i).padStart(5, '0');
            el.Item = nextItem;
          }
        }

        await this.repository.insert(carrinhoEstagios);
        const percursoConsultaJson = await this.carrinhoPercursoConsulta(carrinhoEstagios);

        const basicEvent = new ExpedicaoBasicEventDto({
          Session: session,
          ResposeIn: resposeIn,
          Mutation: percursoConsultaJson.map((item) => item.toJson()),
        });

        socket.emit(resposeIn, JSON.stringify(json));
        socket.broadcast.emit('broadcast.carrinho.percurso.estagio.insert', JSON.stringify(basicEvent.toJson()));
      } catch (error) {
        this.socket.emit(resposeIn, JSON.stringify(error));
      }
    });

    socket.on(`${client} carrinho.percurso.estagio.update`, async (data) => {
      const json = JSON.parse(data);
      const session = json['session'] ?? '';
      const resposeIn = json['resposeIn'] ?? `${client} carrinho.percurso.estagio.update`;
      const mutation = json['mutation'];

      try {
        const carrinhoEstagios = this.convert(mutation);
        await this.repository.update(carrinhoEstagios);
        const percursoConsultaJson = await this.carrinhoPercursoConsulta(carrinhoEstagios);

        const basicEvent = new ExpedicaoBasicEventDto({
          Session: session,
          ResposeIn: resposeIn,
          Mutation: percursoConsultaJson.map((item) => item.toJson()),
        });

        socket.emit(resposeIn, JSON.stringify(json));
        socket.broadcast.emit('broadcast.carrinho.percurso.estagio.update', JSON.stringify(basicEvent.toJson()));
      } catch (error) {
        this.socket.emit(resposeIn, JSON.stringify(error));
      }
    });

    socket.on(`${client} carrinho.percurso.estagio.delete`, async (data) => {
      const json = JSON.parse(data);
      const session = json['session'] ?? '';
      const resposeIn = json['resposeIn'] ?? `${client} carrinho.percurso.estagio.delete`;
      const mutation = json['mutation'];

      try {
        const carrinhoEstagios = this.convert(mutation);
        await this.repository.delete(carrinhoEstagios);
        const percursoConsultaJson = await this.carrinhoPercursoConsulta(carrinhoEstagios);

        const basicEvent = new ExpedicaoBasicEventDto({
          Session: session,
          ResposeIn: resposeIn,
          Mutation: percursoConsultaJson.map((item) => item.toJson()),
        });

        socket.emit(resposeIn, JSON.stringify(json));
        socket.broadcast.emit('broadcast.carrinho.percurso.estagio.delete', JSON.stringify(basicEvent.toJson()));
      } catch (error) {
        this.socket.emit(resposeIn, JSON.stringify(error));
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
      ];

      const result = await this.repository.consulta(params);
      if (result.length > 0) carrinhoPercursoConsulta.push(result.shift()!);
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
    const carrinhosEstagio = await this.repository.select([
      { key: 'CodEmpresa', value: codEmpresa },
      { key: 'CodCarrinhoPercurso', value: codCarrinhoPercurso },
    ]);

    if (carrinhosEstagio.length == 0) return '00001';
    const itens = carrinhosEstagio.map((item) => item.Item);
    const max = Math.max(...itens.map((item) => Number(item)));
    return String(max + 1).padStart(5, '0');
  }
}
