import { getFirestore } from 'firebase-admin/firestore';

export default abstract class BaseRepository {
  protected readonly db = getFirestore();
}
