import { Component, inject } from '@angular/core';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { CardService } from '../../services/card.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable, debounceTime } from 'rxjs';
import { Card } from '../models/card.interface';
import { DeckService } from '../../services/deck.service';
import { Deck } from '../models/deck.interface';

@Component({
  selector: 'app-creator',
  standalone: true,
  imports: [AsyncPipe, ReactiveFormsModule, JsonPipe],
  templateUrl: './creator.component.html',
  styleUrl: './creator.component.scss',
})
export class CreatorComponent {

  private readonly cardService = inject(CardService);
  private readonly deckService = inject(DeckService);

  cards$ = new Observable<Card[]>
  searchCtrl = new FormControl('');

  form = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    author: new FormControl(''),
    deck: new FormControl<string[]>([], {nonNullable: true}),
});

  ngOnInit() {

    this.searchCtrl.valueChanges.
    pipe(debounceTime(1000))
    .subscribe((value) => {
      if(value) {
        this.cards$ = this.cardService.getCards(value);
      }
    }
    );
  }

  addCard(card: Card) {
    this.form.controls.deck.setValue([
      ...this.form.controls.deck.value,
      card.card_images[0].image_url
    ])
  }

  saveDeck() {
    this.deckService.addDeck(this.form.value as Deck).subscribe({
      next: () => {
        alert("Deck saved!")
      },
      error(err) {
        console.log(err);
      },
    })
  }

}
