import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IMovie, IMovieDetails} from "./movie-list.component";

@Injectable({
  providedIn: 'root'
})
export class OmdbService {
  batmanOmdbUrl: string = 'http://www.omdbapi.com/?s=Batman';
  singleMovieUrl: string = 'http://www.omdbapi.com/?i=';
  apiKey: string = 'dec0e012';

  constructor(private http: HttpClient) {
  }

  addApiKeyToUrl(url: string) {
    return `${url}&apikey=${this.apiKey}`;
  }

  getAllMovies() {
    return this.http.get<IMovie[]>(this.addApiKeyToUrl(this.batmanOmdbUrl));
  }

  getMovie(omdbId: string) {
    return this.http.get<IMovieDetails>(this.addApiKeyToUrl(`${this.singleMovieUrl}${omdbId}`));
  }
}
