import ContractBaseRepository from '../contracts/base.repository.contract';
import WebhookDto from '../dto/webhook.dto';

export default class WebhookRegisterService {
  constructor(readonly repo: ContractBaseRepository<WebhookDto>) {}

  public async execute(webhook: WebhookDto): Promise<void> {
    try {
      await this.repo.insert(webhook);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
