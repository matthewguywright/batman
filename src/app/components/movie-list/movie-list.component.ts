import {Component, OnInit} from '@angular/core';
import {OmdbService} from "./omdb.service";

@Component({
    selector: 'movie-list',
    templateUrl: './movie-list.component.html',
    styleUrls: ['./movie-list.component.sass']
})
export class MovieListComponent implements OnInit {
    headerTitle:string;
    footerCopyright: string;
    masterMovieList: Movie[];

    constructor(private _ombdService: OmdbService) {
    }

    ngOnInit() {
        this.headerTitle = 'Holy Bunions Batman! - Batman Time Machine';
        this.footerCopyright ='&copy; 2019. All images and logos belong to their respective owners.';
        this._ombdService.getAllMovies()
          .subscribe((data: Movie[]) => this.masterMovieList = data);
    }
}
export interface Movie {
   Poster: string;
   Title: string;
   Type: string;
   Year: string;
   imdbID: string;
}
