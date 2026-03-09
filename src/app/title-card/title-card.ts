import { Component, Input } from '@angular/core';
import { Titles } from '../models/title';

@Component({
  selector: 'app-title-card',
  imports: [],
  templateUrl: './title-card.html',
  styleUrl: './title-card.scss',
})
export class TitleCard {
  @Input()
  title!: Titles;
}
