import { Server as SocketIOServer } from 'socket.io';
import { Pagination, OrderBy } from '../contracts/local.base.params';

import BasePeriodicListenService from './base.periodic.listen.service';
import ExpedicaoBasicListenEvent from '../model/expedicao.basic.listen.event';
import SepararRepository from '../socket/separar/separar.repository';

export default class SepararPeriodicListenService extends BasePeriodicListenService {
  private repository: SepararRepository;
  private io: SocketIOServer;

  constructor(io: SocketIOServer, intervalTime: number = 8000) {
    super(intervalTime);
    this.io = io;
    this.repository = new SepararRepository();
  }

  /**
   * Implementa a emissão periódica de dados de separar.consulta
   * Consulta os últimos 20 registros ordenados por CodEmpresa DESC, CodSepararEstoque DESC
   */
  protected async emitData(): Promise<void> {
    try {
      // Configurar paginação para últimos 20 registros
      const pagination = Pagination.create(20, 0, 1);

      // Configurar ordenação descendente por CodEmpresa e CodSepararEstoque
      const orderBy = OrderBy.create('CodEmpresa, CodSepararEstoque', 'DESC');

      // Consultar dados
      const separarConsulta = await this.repository.consulta([], pagination, orderBy);

      // Criar evento no formato ExpedicaoBasicListenEvent
      const basicEventSepararConsulta = new ExpedicaoBasicListenEvent({
        Data: separarConsulta.map((item) => item.toJson()),
      });

      // Emitir para todos os clientes conectados
      this.io.emit('separar.consulta.listen', JSON.stringify(basicEventSepararConsulta.toJson()));
      //console.log(`[SepararPeriodicListenService] Emitido ${separarConsulta.length} registros`);
    } catch (error: any) {
      console.error('[SepararPeriodicListenService] Erro ao consultar/emitir dados:', error.message);
      // Não propaga o erro para não interromper o timer
    }
  }
}
