import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { DeckService } from '../../services/deck.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Deck } from '../models/deck.interface';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
})
export class DetailComponent {
  private readonly deckService = inject(DeckService);
  private activatedRoute = inject(ActivatedRoute);

  deck$!: Observable<Deck>;

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'];
    this.deck$ = this.deckService.getDeck(id);
  }

}
