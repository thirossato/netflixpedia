import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { map, Observable } from 'rxjs';
import { TitlesResponse } from './models/title';

@Injectable({
  providedIn: 'root',
})
export class TitlesService {
  private baseUrl = "https://unogsng.p.rapidapi.com";
  private defaultHeaders = new HttpHeaders({
    'x-rapidapi-host': environment['rapidapi-host'],
    'x-rapidapi-key': environment['rapidapi-key'],
  });

  constructor(private http: HttpClient) {}

  public getTop10Titles(
    type: 'series' | 'movie',
    audioLanguage?: string,
    subtitleLanguage?: string,
  ): Observable<TitlesResponse> {
    let params = new HttpParams({
      fromObject: {
        type,
        orderby: 'rating',
        countrylist: '29',
        country_andorunique: 'unique',
        limit: '10',
      },
    });
    if (audioLanguage) params = params.set('audio', audioLanguage);
    if (subtitleLanguage) {
      params = params.set('audiosubtitle_andor', 'and');
      params = params.set('subtitle', 'portuguese');
    }

    return this.http.get(`${this.baseUrl}/search`, {
      headers: this.defaultHeaders,
      params,
    }).pipe(
      map((data: any) => data.results)
    ) as Observable<TitlesResponse>;
  }
}
