import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Card, CardApiResponse } from '../pages/models/card.interface';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  private readonly http = inject(HttpClient);

  getCards(cardName: string) {
    const params = new HttpParams().set('fname', cardName)
    return this.http.get<CardApiResponse>
    ('https://db.ygoprodeck.com/api/v7/cardinfo.php?num=5&offset=5', { params })
    .pipe(
      map((resp: CardApiResponse) => resp.data)
    );
  }
}
