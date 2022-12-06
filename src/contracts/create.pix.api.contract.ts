import { requestCreatePixDTO } from '../dto/request.create.pix.dto';
import { responseCreatePixDto } from '../dto/response.create.pix.dto';

export default interface CreatePixApiContract {
  execute(request: requestCreatePixDTO): Promise<responseCreatePixDto>;
}
