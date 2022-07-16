import axios from 'axios';
import { liberacaoKeyDto } from '../dto/liberacao.key.dto';
import { requestCobrancaSe7eDto } from '../dto/request.cobranca.se7e.dto';
import { responsePixDetailDto } from '../dto/response.pix.detail.dto';

import Cobranca from '../entities/cobranca';
import ProcessInfo from '../entities/process.info';

import LocalSqlServerItemLiberacaoBloqueioRepository from '../repository/local.sql.server.item.liberacao.bloqueio.repository';
import LocalSqlServerItemLiberacaoBloqueioSituacaoRepository from '../repository/local.sql.server.item.liberacao.bloqueio.situacao.repository';
import LocalSqlServerLiberacaoBloqueioRepository from '../repository/local.sql.server.liberacao.bloqueio.repository';
import LocalStorageChaveRepository from '../repository/local.storage.chave.repository';

import ChavesGnCobrancaServices from './chaves.gn.cobranca.services';
import CreateGnPixService from './create.gn.pix.service';
import CreateGnQrcodeService from './create.gn.qrcode.service';
import LinstenPeymentPix from './linsten.peyment.pix';
import RegraBloqueioService from './regra.bloqueio.service';

export default class CobrancaGnPixService {
  constructor(private cobrancaDto: requestCobrancaSe7eDto) {}
  public async executar(): Promise<void> {
    try {
      //get token from repository
      const _localStorageChave = new LocalStorageChaveRepository();
      const chaveDto = await new ChavesGnCobrancaServices(_localStorageChave).execute();
      if (!chaveDto) throw new Error('Chave não encontrada');
      const _cobranca: Cobranca = Cobranca.fromRequestCobrancaSe7eDto(this.cobrancaDto);
      const _createGnPixService = new CreateGnPixService(chaveDto.chave, _cobranca);
      const _responseCreatePix = await _createGnPixService.execute();

      //todo: insert value in repository
      if (_responseCreatePix instanceof ProcessInfo) {
        throw new Error(`${_responseCreatePix.info}, ${_responseCreatePix.result}`);
      }
      const _createRnQrcodeService = new CreateGnQrcodeService(_responseCreatePix);
      const _pagamentoQrCode = await _createRnQrcodeService.execute();

      //todo: remove value bifore test
      const resultOpenQrcode = axios.post('http://192.168.0.19:3500/qrcode', {
        action: 'open',
        id: _responseCreatePix.txid,
        link: _pagamentoQrCode.qrcode,
        phone: _cobranca.cliente.telefone,
        awaiting_payment: true,
        confirmed_payment: false,
        canceled: false,
        message: 'Teste fodão',
        error: '',
        img: _pagamentoQrCode.imagemQrcode,
      });

      //todo: insert value in repository / liberacao
      const _linstenPeymentPix = new LinstenPeymentPix();
      _linstenPeymentPix.open(_responseCreatePix.txid, async (pixDetailDto: responsePixDetailDto) => {
        const _regraBloqueioService = new RegraBloqueioService(
          new LocalSqlServerLiberacaoBloqueioRepository(),
          new LocalSqlServerItemLiberacaoBloqueioRepository(),
          new LocalSqlServerItemLiberacaoBloqueioSituacaoRepository(),
        );

        const _liberacaoKey: liberacaoKeyDto = {
          CodEmpresa: this.cobrancaDto.LiberacaoKey.CodEmpresa,
          CodFilial: this.cobrancaDto.LiberacaoKey.CodFilial,
          IdLiberacao: this.cobrancaDto.LiberacaoKey.IdLiberacao,
          Origem: this.cobrancaDto.LiberacaoKey.Origem,
          CodOrigem: this.cobrancaDto.LiberacaoKey.CodOrigem,
          Item: this.cobrancaDto.LiberacaoKey.Item,
        };

        //todo: insert value in repository
        const _regraBloquio = await _regraBloqueioService.findOneFromLiberacaoKey(_liberacaoKey);
        if (_regraBloquio instanceof ProcessInfo) {
          throw new Error(`${_regraBloquio.info}, ${_regraBloquio.result}`);
        }

        const liberacao = {
          codLiberacaoBloqueio: _regraBloquio.codLiberacaoBloqueio,
          item: _regraBloquio.itemLiberacaoBloqueio[0].item,
          status: 'L',
          rotinaLiberacao: 'Remota',
          dataHoraLiberacao: new Date(),
          codUsuarioLiberacao: this.cobrancaDto.Usuario.CodUsuario,
          estacaoTrabalhoLiberacao: this.cobrancaDto.Usuario.EstacaoTrabalho,
          observacaoLiberacao: '',
          motivoRejeicaoLiberacaoBloqueio: '',
          complemento: '',
        };

        _regraBloqueioService.setSituacao(liberacao);

        //todo: remove value bifore test
        const resultOpenQrcode = axios.post('http://192.168.0.19:3500/qrcode', {
          action: 'close',
          id: _responseCreatePix.txid,
          link: _pagamentoQrCode.qrcode,
          phone: _cobranca.cliente.telefone,
          awaiting_payment: false,
          confirmed_payment: true,
          canceled: false,
          message: 'CONFIRMANDO PAGAMENTO',
          error: '',
          img: _pagamentoQrCode.imagemQrcode,
        });
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
