import { Server as SocketIOServer, Socket } from 'socket.io';

import ExpedicaoBasicErrorEvent from '../../model/expedicao.basic.error.event';
import ExpedicaoMutationBasicEvent from '../../model/expedicao.basic.mutation.event';
import ExpedicaoConferirConsultaDto from '../../dto/expedicao/expedicao.conferir.consulta.dto';
import ExpedicaoBasicSelectEvent from '../../model/expedicao.basic.query.event';
import ExpedicaoConferirDto from '../../dto/expedicao/expedicao.conferir.dto';
import ExpedicaoSituacaoModel from '../../model/expedicao.situacao.model';
import ConferirRepository from './conferir.repository';

export default class ConferirEvent {
  private repository = new ConferirRepository();

  constructor(
    private readonly io: SocketIOServer,
    private readonly socket: Socket,
  ) {
    const client = socket.id;

    socket.on(`${client} conferir.consulta`, async (data) => {
      const json = JSON.parse(data);
      const session = json['Session'] ?? '';
      const resposeIn = json['ResposeIn'] ?? `${client} conferir.consulta`;
      const params = json['Where'] ?? '';

      try {
        const result = await this.repository.consulta(params);
        const jsonData = result.map((item) => item.toJson());

        const event = new ExpedicaoBasicSelectEvent({
          Session: session,
          ResposeIn: resposeIn,
          Data: jsonData,
        });

        socket.emit(resposeIn, JSON.stringify(event.toJson()));
      } catch (error: any) {
        const event = new ExpedicaoBasicErrorEvent({
          Session: session,
          ResposeIn: resposeIn,
          Error: error.message,
        });

        socket.emit(resposeIn, JSON.stringify(event.toJson()));
      }
    });

    socket.on(`${client} carrinho.conferir.consulta`, async (data) => {
      const json = JSON.parse(data);
      const session = json['Session'] ?? '';
      const resposeIn = json['ResposeIn'] ?? `${client} carrinho.conferir.consulta`;
      const params = json['Where'] ?? '';

      try {
        const result = await this.repository.carrinhoConferirConsulta(params);
        const jsonData = result.map((item) => item.toJson());

        const event = new ExpedicaoBasicSelectEvent({
          Session: session,
          ResposeIn: resposeIn,
          Data: jsonData,
        });

        socket.emit(resposeIn, JSON.stringify(event.toJson()));
      } catch (error: any) {
        const event = new ExpedicaoBasicErrorEvent({
          Session: session,
          ResposeIn: resposeIn,
          Error: error.message,
        });

        socket.emit(resposeIn, JSON.stringify(event.toJson()));
      }
    });

    socket.on(`${client} conferir.select`, async (data) => {
      const json = JSON.parse(data);
      const session = json['Session'] ?? '';
      const resposeIn = json['ResposeIn'] ?? `${client} conferir.select`;
      const params = json['Where'] ?? '';

      try {
        const result = await this.repository.select(params);
        const jsonData = result.map((item) => item.toJson());

        const event = new ExpedicaoBasicSelectEvent({
          Session: session,
          ResposeIn: resposeIn,
          Data: jsonData,
        });

        socket.emit(resposeIn, JSON.stringify(event.toJson()));
      } catch (error: any) {
        const event = new ExpedicaoBasicErrorEvent({
          Session: session,
          ResposeIn: resposeIn,
          Error: error.message,
        });

        socket.emit(resposeIn, JSON.stringify(event.toJson()));
      }
    });

    socket.on(`${client} conferir.insert`, async (data) => {
      const json = JSON.parse(data);
      const session = json['Session'] ?? '';
      const resposeIn = json['ResposeIn'] ?? `${client} conferir.insert`;
      const mutation = json['Mutation'];

      try {
        const itens = this.convert(mutation);

        //PROTEGE CONTRA DUPLICIDADE DE ORIGEM
        let duplicateOrigin = false;
        for (const item of itens) {
          const result = await this.repository.select(
            ` CodEmpresa = ${item.CodEmpresa}
            AND Origem = '${item.Origem}'
            AND CodOrigem = ${item.CodOrigem}
            AND Situacao NOT IN ( '${ExpedicaoSituacaoModel.cancelada}' ) `,
          );

          if (result.length > 0) {
            duplicateOrigin = true;
            break;
          }
        }

        if (duplicateOrigin) {
          const basicEventErro = new ExpedicaoBasicErrorEvent({
            Session: session,
            ResposeIn: resposeIn,
            Error: ['Origem duplicada, proibido inserir cancelado'],
          });

          socket.emit(resposeIn, JSON.stringify(basicEventErro.toJson()));
          return;
        }

        for (const item of itens) {
          const sequence = await this.repository.sequence();
          item.CodConferir = sequence?.Valor ?? 0;
          await this.repository.insert([item]);
        }

        const conferirConsulta: ExpedicaoConferirConsultaDto[] = [];
        for (const item of itens) {
          const result = await this.repository.consulta(
            ` CodEmpresa = ${item.CodEmpresa}
            AND CodConferir = ${item.CodConferir} `,
          );

          conferirConsulta.push(...result);
        }

        const basicEvent = new ExpedicaoMutationBasicEvent({
          Session: session,
          ResposeIn: resposeIn,
          Mutation: itens.map((item) => item.toJson()),
        });

        const basicEventConferirConsulta = new ExpedicaoMutationBasicEvent({
          Session: session,
          ResposeIn: resposeIn,
          Mutation: conferirConsulta.map((item) => item.toJson()),
        });

        socket.emit(resposeIn, JSON.stringify(basicEvent.toJson()));
        socket.broadcast.emit('conferir.insert', JSON.stringify(basicEvent.toJson()));
        io.emit('conferir.insert.listen', JSON.stringify(basicEventConferirConsulta.toJson()));
      } catch (error: any) {
        const event = new ExpedicaoBasicErrorEvent({
          Session: session,
          ResposeIn: resposeIn,
          Error: error.message,
        });

        socket.emit(resposeIn, JSON.stringify(event.toJson()));
      }
    });

    socket.on(`${client} conferir.update`, async (data) => {
      const json = JSON.parse(data);
      const session = json['Session'] ?? '';
      const resposeIn = json['ResposeIn'] ?? `${client} conferir.update`;
      const mutation = json['Mutation'];

      try {
        const itens = this.convert(mutation);
        await this.repository.update(itens);

        const conferirConsulta: ExpedicaoConferirConsultaDto[] = [];
        for (const item of itens) {
          const result = await this.repository.consulta(
            ` CodEmpresa = ${item.CodEmpresa}
             AND CodConferir = ${item.CodConferir} `,
          );

          conferirConsulta.push(...result);
        }

        const basicEvent = new ExpedicaoMutationBasicEvent({
          Session: session,
          ResposeIn: resposeIn,
          Mutation: itens.map((item) => item.toJson()),
        });

        const basicEventConferirConsulta = new ExpedicaoMutationBasicEvent({
          Session: session,
          ResposeIn: resposeIn,
          Mutation: conferirConsulta.map((item) => item.toJson()),
        });

        socket.emit(resposeIn, JSON.stringify(basicEvent.toJson()));
        socket.broadcast.emit('conferir.update', JSON.stringify(basicEvent.toJson()));
        io.emit('conferir.update.listen', JSON.stringify(basicEventConferirConsulta.toJson()));
      } catch (error: any) {
        const event = new ExpedicaoBasicErrorEvent({
          Session: session,
          ResposeIn: resposeIn,
          Error: error.message,
        });

        socket.emit(resposeIn, JSON.stringify(event.toJson()));
      }
    });

    socket.on(`${client} conferir.delete`, async (data) => {
      const json = JSON.parse(data);
      const session = json['Session'] ?? '';
      const resposeIn = json['ResposeIn'] ?? `${client} Conferir.delete`;
      const mutation = json['Mutation'];

      try {
        const itens = this.convert(mutation);

        const conferirConsulta: ExpedicaoConferirConsultaDto[] = [];
        for (const item of itens) {
          const result = await this.repository.consulta(
            ` CodEmpresa = ${item.CodEmpresa} AND CodConferir = ${item.CodConferir}`,
          );

          conferirConsulta.push(...result);
        }

        await this.repository.delete(itens);

        const basicEvent = new ExpedicaoMutationBasicEvent({
          Session: session,
          ResposeIn: resposeIn,
          Mutation: itens.map((item) => item.toJson()),
        });

        const basicEventConferirConsulta = new ExpedicaoMutationBasicEvent({
          Session: session,
          ResposeIn: resposeIn,
          Mutation: conferirConsulta.map((item) => item.toJson()),
        });

        socket.emit(resposeIn, JSON.stringify(basicEvent.toJson()));
        socket.broadcast.emit('conferir.delete', JSON.stringify(basicEvent.toJson()));
        io.emit('conferir.delete.listen', JSON.stringify(basicEventConferirConsulta.toJson()));
      } catch (error: any) {
        const event = new ExpedicaoBasicErrorEvent({
          Session: session,
          ResposeIn: resposeIn,
          Error: error.message,
        });

        socket.emit(resposeIn, JSON.stringify(event.toJson()));
      }
    });
  }

  private convert(mutations: any[] | any): ExpedicaoConferirDto[] {
    try {
      if (!Array.isArray(mutations)) mutations = [mutations];
      return mutations.map((mutation: any) => {
        return ExpedicaoConferirDto.fromObject(mutation);
      });
    } catch (error) {
      return [];
    }
  }
}
