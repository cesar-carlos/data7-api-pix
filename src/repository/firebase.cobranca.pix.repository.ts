import ContractBaseRepository from '../contracts/base.repository.contract';
import CobrancaPix from '../entities/cobranca.pix';
import FirebaseBaseRepository from './firebase.base.repository';

export default class FirebaseCobrancaPixRepository
  extends FirebaseBaseRepository
  implements ContractBaseRepository<CobrancaPix>
{
  readonly collection = 'cobrancas-pix';

  async find(sysId: string): Promise<CobrancaPix | undefined> {
    try {
      const query = this.db.collection(this.collection).where('SysId', '==', sysId).get();
      const docRef = await query;
      const data = docRef.docs.map((doc) => {
        return { ...doc.data() };
      });

      if (!data || data.length === 0) return undefined;
      const cobrancaPix = data.shift() as CobrancaPix;
      return cobrancaPix;
    } catch (error: any) {
      throw new Error(error).message;
    }
  }

  async findAll(): Promise<CobrancaPix[] | undefined> {
    try {
      const query = this.db.collection(this.collection).get();
      const docRef = await query;
      const docs = docRef.docs.map((doc) => {
        return { ...doc.data() };
      });

      const cobrancasPix = docs as CobrancaPix[];
      return cobrancasPix;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async insert(entity: CobrancaPix): Promise<void> {
    try {
      const docRef = this.db.collection(this.collection).doc();
      await docRef.set(JSON.parse(JSON.stringify(entity)));
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async update(entity: CobrancaPix): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
