import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Item } from './item';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DataService {
  itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;
  itemDoc: AngularFirestoreDocument<Item>;

  constructor(public db: AngularFirestore) {
    db.firestore.settings({ timestampsInSnapshots: true });
    //this.items = this.db.collection('items').valueChanges();
    this.itemsCollection = this.db.collection('items');

    this.items = this.db.collection('items', ref => ref.orderBy('title', 'asc')).snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Item;
        data.id = a.payload.doc.id;
        return data;
      });
    });

  }

  getItems() {
    return this.items;
  }

  addItem(item: Item) {
    this.itemsCollection.add(item);
  }

  deleteItem(item: Item) {
    this.itemDoc = this.db.doc(`items/${item.id}`);
    this.itemDoc.delete();
  }

  updateItem(item: Item) {
    this.itemDoc = this.db.doc(`items/${item.id}`);
    this.itemDoc.update(item);
  }

  }

