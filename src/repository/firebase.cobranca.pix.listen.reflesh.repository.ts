import moment from 'moment';
import FirebaseBaseRepository from './firebase.base.repository';

export default class FirebaseCobrancaPixListenRefleshRepository extends FirebaseBaseRepository {
  readonly collection = 'refresh-pix';
  linten(callback: (txid: any) => void): void {
    try {
      this.db.collection(this.collection).onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const docUpdate = doc.updateTime.seconds * 1000;
          const oneBackhour = moment().subtract(5, 'day').valueOf();
          if (docUpdate > oneBackhour) {
            callback(doc.data());
          }
        });
      });
    } catch (error: any) {}
  }
}
