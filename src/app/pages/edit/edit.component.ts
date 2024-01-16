import { Component, inject } from '@angular/core';
import { Card } from '../models/card.interface';
import { Deck } from '../models/deck.interface';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { Observable, debounceTime } from 'rxjs';
import { CardService } from '../../services/card.service';
import { DeckService } from '../../services/deck.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss',
})
export class EditComponent {
  private readonly cardService = inject(CardService);
  private readonly deckService = inject(DeckService);
  private readonly activatedRoute = inject(ActivatedRoute);

  cards$ = new Observable<Card[]>();
  searchCtrl = new FormControl('');
  id!: string;

  form = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    author: new FormControl(''),
    deck: new FormControl<string[]>([], { nonNullable: true }),
  });

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];

    this.deckService
      .getDeck(this.id)
      .subscribe((data) => this.form.patchValue(data));

    this.searchCtrl.valueChanges.pipe(debounceTime(1000)).subscribe((value) => {
      if (value) {
        this.cards$ = this.cardService.getCards(value);
      }
    });
  }

  addCard(card: Card) {
    this.form.controls.deck.setValue([
      ...this.form.controls.deck.value,
      card.card_images[0].image_url,
    ]);
  }

  updateDeck() {
    this.deckService.updateDeck(this.form.value as Deck, this.id);
  }

  removeCard(card: string) {
    const updateDeck = this.form.controls.deck.value.filter((c) => c !== card);
    this.form.controls.deck.setValue(updateDeck);
  }


}

