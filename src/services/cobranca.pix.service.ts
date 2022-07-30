import axios from 'axios';
import { requestCobrancaSe7eDto } from '../dto/request.cobranca.se7e.dto';
import Chave from '../entities/chave';
import Cobranca from '../entities/cobranca';
import ProcessInfo from '../entities/process.info';

import { ProcessInfoStatusType } from '../type/process.info.status.type';
import CreateGnPixService from './create.gn.pix.service';
import CreateGnQrcodeService from './create.gn.qrcode.service';

export default class CobrancaPixService {
  constructor(private readonly chave: Chave) {}
  public async executar(cobrancaDto: requestCobrancaSe7eDto): Promise<ProcessInfo> {
    try {
      const cobranca = Cobranca.fromRequestCobrancaSe7eDto(cobrancaDto);
      const cobrancaPIX = new CreateGnPixService(this.chave.chave);
      const resultCreatePix = await cobrancaPIX.execute(cobranca);
      if (resultCreatePix instanceof ProcessInfo) {
        return resultCreatePix;
      }

      //TODO: GRAVAR TODOS OS DADOS DO (resultCreatePix) NO BANCO DE DADOS

      const _createGnQrcodeService = new CreateGnQrcodeService();
      const resultCreateQrCode = await _createGnQrcodeService.execute(resultCreatePix);
      if (resultCreateQrCode instanceof ProcessInfo) {
        return resultCreateQrCode;
      }

      //TODO: GRAVAR TODOS OS DADOS DO (_createGnQrcodeService) NO BANCO DE DADOS

      //TODO: remove value bifore test
      const request = axios.post('http://26.159.104.172:3500/qrcode', {
        action: 'open',
        id: resultCreateQrCode.id,
        link: resultCreateQrCode.qrcode,
        phone: cobranca.cliente.telefone,
        awaiting_payment: true,
        confirmed_payment: false,
        canceled: false,
        message: 'Teste fodão',
        error: '',
        img: resultCreateQrCode.imagemQrcode,
      });

      const infoStatusSuccess: ProcessInfoStatusType = { status: 'success' };
      return new ProcessInfo(infoStatusSuccess, 'CobrancaPixService');
    } catch (error: any) {
      const infoStatusError: ProcessInfoStatusType = { status: 'error' };
      return new ProcessInfo(infoStatusError, 'CobrancaPixService', error.message);
    }
  }
}

// RESULTADO DO EXECUTAR:
// {
//   calendario: { criacao: '2022-07-29T20:23:33.065Z', expiracao: 1600 },
//   txid: 'da8f0fd899eb4977984a949569ae28d5',
//     location: 'qrcodes-pix.gerencianet.com.br/v2/296dd6aa6cb44c82ab09fa52bf39543b',
//     tipoCob: 'cob',
//     criacao: '2022-07-29T20:23:33.088Z'
//   },
//   location: 'qrcodes-pix.gerencianet.com.br/v2/296dd6aa6cb44c82ab09fa52bf39543b',
//   status: 'ATIVA',
//   devedor: { cpf: '48855600125', nome: ' JORGE MEINERZ' },
//   valor: { original: '0.50' },
//   chave: 'bc89689b-11bc-4304-b2c4-c474e90e2467',
//   solicitacaoPagador: ' (LIVRE PARA ADICIONAR OBSERVACAO NO BOLETO DO CLIENTE) ',
//   infoAdicionais: [
//     {
//       nome: 'sysId',
//       valor: '3832337.11.27740308000120.20220729162330-OB.22.001'
//     },
//     { nome: 'observações', valor: 'outras observações' }
//   ]
// }
