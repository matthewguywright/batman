import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {OmdbService} from "./omdb.service";
import {Movie} from "./movie.model";
import _ from 'lodash';

@Component({
    selector: 'movie-list',
    templateUrl: './movie-list.component.html',
    styleUrls: ['./movie-list.component.sass']
})
export class MovieListComponent implements OnInit {
    @Input() headerTitle: string;
    footerCopyright: string;
    masterMovieList: Movie[];
    filterName: string = 'All';
    movies: IMovieDetails[] = [];
    loadedMovies: IMovieDetails[] = [];
    localPosterImageUrl: string = '/assets/images/posters/';

    constructor(private _ombdService: OmdbService, private elm: ElementRef) {
    }

    ngOnInit() {
        this.footerCopyright ='Copyright 2019. All images and logos belong to their respective owners.';
        this._ombdService.getAllMovies()
          .subscribe((data: any) => {
            this.masterMovieList = data.Search;

            for(let i = 0, il = this.masterMovieList.length; i < il; i++) {
              this._ombdService.getMovie(this.masterMovieList[i].imdbID).subscribe((movie: IMovieDetails) => {
                  this.movies = [...this.movies, movie];
                  this.loadedMovies = this.movies;
              });
            }
          });
    }

    getNewMoviePosterUrl(url: string) {
        const imgFileName = url.replace('https://m.media-amazon.com/images/M/', '');
        return `${this.localPosterImageUrl}${imgFileName}`;
    }

    filterMoviesByDecade(decade: string) {
        if(decade) {
            this.filterName = `${decade}'s`;
            this.loadedMovies = _.filter(this.movies, ({Released}) => {
                const releaseYear = Released.substr(-4, 4);
                if(decade.substr(0,1) === '2') {
                    return releaseYear.substr(0,1) === '2';
                } else {
                    return decade.substr(0,3) === releaseYear.substr(0,3);
                }
            });
        } else {
            this.filterName = 'All';
            this.loadedMovies = this.movies;
        }
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
