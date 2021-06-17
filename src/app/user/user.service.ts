import { UserModel } from './models/user.model';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userCollection: AngularFirestoreCollection<UserModel>;

  constructor(private firestore: AngularFirestore) {
    this.userCollection = firestore.collection('users');
  }

  save(user: UserModel): Promise<void> {
    user.id = user.id || this.firestore.createId();
    return this.userCollection.doc(user.id).set(user);
  }

  getAll(): Observable<UserModel[]> {
    return this.userCollection.valueChanges();
  }
  getById(id: string): Observable<UserModel> {
    return this.userCollection
      .doc<UserModel>(id)
      .valueChanges() as Observable<UserModel>;
  }
  getByField(field: string, value: string): Observable<UserModel[]> {
    return this.firestore
      .collection<UserModel>('users', (ref) => {
        return ref.where(field, '==', value);
      })
      .valueChanges();
  }
  delete(id: string): Promise<void> {
    return this.userCollection.doc(id).delete();
  }
}
