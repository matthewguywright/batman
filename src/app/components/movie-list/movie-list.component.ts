import {Component, OnInit} from '@angular/core';
import {OmdbService} from "./omdb.service";
import {Movie} from "./movie.model";

@Component({
    selector: 'movie-list',
    templateUrl: './movie-list.component.html',
    styleUrls: ['./movie-list.component.sass']
})
export class MovieListComponent implements OnInit {
    headerTitle:string;
    footerCopyright: string;
    masterMovieList: Movie[];
    movies: IMovieDetails[] = [];
    localPosterImageUrl: string = '/assets/images/posters/';

    constructor(private _ombdService: OmdbService) {
    }

    ngOnInit() {
        this.headerTitle = 'Holy Bunions Batman! - Batman Time Machine';
        this.footerCopyright ='Copyright 2019. All images and logos belong to their respective owners.';
        this._ombdService.getAllMovies()
          .subscribe((data: any) => {
            this.masterMovieList = data.Search;

            for(let i = 0, il = this.masterMovieList.length; i < il; i++) {
              this._ombdService.getMovie(this.masterMovieList[i].imdbID).subscribe((movie: IMovieDetails) => this.movies = [...this.movies, movie])
            }
          });
    }

    getNewMoviePosterUrl(url: string) {
        const imgFileName = url.replace('https://m.media-amazon.com/images/M/', '');
        console.log(`${this.localPosterImageUrl}${imgFileName}`);
    }
}
export interface IMovie {
  Poster: string;
  Title: string;
  Year: string;
  imdbID: string;
}
export interface IMovieDetails {
   Poster: string;
   Title: string;
   Year: string;
   imdbID: string;
   Released: string;
   Plot: string;
   Rated: string;
   Runtime: string;
}
