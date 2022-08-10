import moment from 'moment';
import { STATUS } from '../type/status';
import FirebaseBaseRepository from './firebase.base.repository';

export default class FirebaseCobrancaPixListenRepository extends FirebaseBaseRepository {
  readonly collection = 'cobrancas-pix';
  linten(callback: (CobrancaPix: any) => void): void {
    try {
      this.db
        .collection(this.collection)
        .where('STATUS', 'in', [STATUS.CONCLUIDO, STATUS.CANCELADO, STATUS.CANCELADO_CLIENTE])
        .where('datacriacao', '>', moment().subtract(1, 'days').toDate())
        .onSnapshot((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            callback(doc.data());
          });
        });
    } catch (error: any) {}
  }
}
