import { STATUS } from '../dto/response.create.pix.dto';
import GerencianetPixDetail from '../adapter/gerencianet.pix.detail.adapter';
import { responsePixDetailDto } from '../dto/response.pix.detail.dto';

export default class LinstenGnPeymentPixService {
  private _gerencianetPixDetail = new GerencianetPixDetail();
  constructor() {}

  public async open(txid: string, callBack: (pixDetail: responsePixDetailDto) => void): Promise<void> {
    try {
      let _contRequest = 0;
      const interval = 7;
      const requests = 15;

      const intevalId = setInterval(async () => {
        const _responsePixDetailDto = await this._gerencianetPixDetail.execute(txid);

        //stop loop if maxRequest is reached or txid not found
        //insert request in log
        if (_contRequest > requests || !_responsePixDetailDto) {
          clearInterval(intevalId);
        }

        //payment confirmed
        if (_responsePixDetailDto.status === STATUS.CONCLUIDA) {
          callBack(_responsePixDetailDto);
          clearInterval(intevalId);
        }

        _contRequest++;
      }, interval * 1000);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
