import { Component, DestroyRef, inject, OnInit, Signal, signal } from '@angular/core';
import { Titles, TitlesResponse } from '../models/title';
import { CommonModule } from '@angular/common';
import { TitlesService } from '../titles';
import { forkJoin, merge, Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TitleCard } from "../title-card/title-card";

@Component({
  selector: 'app-home',
  imports: [CommonModule, TitleCard],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  private destroyRef = inject(DestroyRef);

  constructor(protected titlesService: TitlesService) {}

  protected top10SubtitledMovies = signal<TitlesResponse>([]);
  protected top10SubtitledSeries = signal<TitlesResponse>([]);
  protected top10Movies = signal<TitlesResponse>([]);
  protected top10Series = signal<TitlesResponse>([]);

  ngOnInit() {
    forkJoin({
      movies: this.titlesService.getTop10Titles('movie', 'portuguese'),
      series: this.titlesService.getTop10Titles('series', 'portuguese'),
      subMovies: this.titlesService.getTop10Titles('movie', undefined, 'portuguese'),
      subSeries: this.titlesService.getTop10Titles('series', undefined, 'portuguese'),
    })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(({ movies, series, subMovies, subSeries }) => {
        this.top10Movies.set(movies);
        this.top10Series.set(series);
        this.top10SubtitledMovies.set(subMovies);
        this.top10SubtitledSeries.set(subSeries);
      });
  }
}
