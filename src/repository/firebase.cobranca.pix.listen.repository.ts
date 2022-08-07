import FirebaseBaseRepository from './firebase.base.repository';

export default class FirebaseCobrancaPixListenRepository extends FirebaseBaseRepository {
  readonly collection = 'cobrancas-pix';

  linten(callback: (CobrancaPix: any) => void): void {
    this.db
      .collection(this.collection)
      //.where('STAUTS', '!=', 'CANCELADO')
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          callback(doc.data());
        });
      });
  }
}
