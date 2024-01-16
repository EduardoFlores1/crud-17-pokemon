import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { Deck } from '../pages/models/deck.interface';
import { Observable, from, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DeckService {
  private readonly firestore = inject(Firestore);
  private readonly deckCollection = collection(this.firestore, 'decks');

  addDeck(deck: Deck) {
    return of(addDoc(this.deckCollection, deck));
  }

  getDecks() {
    return collectionData(this.deckCollection, { idField: 'id' }) as Observable<
      any[]
    >;
  }

  getDeck(id: string) {
    return from(getDoc(doc(this.firestore, 'decks', id))).pipe(
      map((snapshot) => snapshot.data() as Deck)
    );
  }

  deleteDeck(id: string) {
    const docRef = doc(this.firestore, 'decks', id);
    deleteDoc(docRef);
  }

  updateDeck(deck: Deck, id: string) {
    const deckRef = doc(this.firestore, 'decks', id);
    updateDoc(deckRef, { ...deck });
  }
}
