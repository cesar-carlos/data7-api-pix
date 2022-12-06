import moment from 'moment';
import formatter from 'currency-formatter';

import { txid } from '../helper/txid.help';
import { infoAdicionais } from '../dto/request.create.pix.dto';

import ProcessInfo from '../entities/process.info';
import PagamentoPendente from '../entities/pagamento.pendente';
import CobrancaPixInputDTO from '../dto/cobranca.pix.input.dto';
import CreatePixApiContract from '../contracts/create.pix.api.contract';

export default class CreatePixService {
  constructor(private create: CreatePixApiContract) {}

  public async execute(input: CobrancaPixInputDTO): Promise<PagamentoPendente | ProcessInfo> {
    try {
      const adicionais: infoAdicionais[] = [{ nome: 'sysId', valor: input.id }];

      input.infoAdicionais.forEach((item) => {
        adicionais.push({ nome: item.nome, valor: item.valor });
      });

      const result = await this.create.execute({
        sysId: input.id,
        params: { txid: txid.create() },
        calendario: { expiracao: input.expiracao },
        devedor: { cnpj_cpf: input.cnpj_cpf, nome: input.nome },
        valor: { original: formatter.format(input.valor, { code: 'USD', symbol: '' }) },
        solicitacaoPagador: input.solicitacaoPagador,
        infoAdicionais: adicionais,
      });

      const output = new PagamentoPendente(
        result.txid,
        result.sysId,
        result.chave,
        result.status,
        result.devedor,
        result.calendario.criacao,
        moment(result.calendario.criacao).add(result.calendario.expiracao, 'minute').toDate(),
        Number.parseFloat(result.valor.original),
        result.solicitacaoPagador,
        result.infoAdicionais,
        result.qrcode,
        result.imagemQrcode,
      );

      return output;
    } catch (error: any) {
      return new ProcessInfo({ status: 'error' }, error.message);
    }
  }
}
