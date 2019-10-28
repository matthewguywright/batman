import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {OmdbService} from './omdb.service';
import {Movie} from './movie.model';
import _ from 'lodash';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'movie-list',
    templateUrl: './movie-list.component.html',
    styleUrls: ['./movie-list.component.sass']
})
export class MovieListComponent implements OnInit {
    @Input() headerTitle: string;
    @Output() onLanguageChange: EventEmitter<string> = new EventEmitter<string>();
    masterMovieList: Movie[];
    filterName: string = 'All';
    error: string = null;
    isLoaded: boolean = false;
    movies: IMovieDetails[] = [];
    loadedMovies: IMovieDetails[] = [];
    localPosterImageUrl: string = '/assets/images/posters/';
    decadeButtons: Btn[] = [];

    constructor(private ombdService: OmdbService, private elm: ElementRef, private translate: TranslateService) {
    }

    ngOnInit() {
        this.decadeButtons = [
          { decade: 'all'},
          { decade: '1980'},
          { decade: '1990'},
          { decade: '2000'}
        ];

        this.ombdService.getAllMovies()
          .subscribe((data: any) => {
            this.masterMovieList = data.Search;

            for(let i = 0, il = this.masterMovieList.length; i < il; i++) {
              this.ombdService.getMovie(this.masterMovieList[i].imdbID)
                .subscribe(
                  (movie: IMovieDetails) => {
                    this.error = null;
                    this.movies = [...this.movies, movie];
                    this.loadedMovies = this.movies;
                    this.isLoaded = true;
                  },
                  error => {
                    this.error = error;
                  },
                  () => {
                    this.isLoaded = true;
                  }
                );
            }
          });
    }

    setFilterName = (decade) => {
        const keyVal = `decadeBtn.button.${decade}`;
        this.translate.stream(keyVal).subscribe((value) => {
          this.filterName = value;
        });
    }

    getNewMoviePosterUrl(url: string) {
        const imgFileName = url.replace('https://m.media-amazon.com/images/M/', '');
        return `${this.localPosterImageUrl}${imgFileName}`;
    }

    filterMoviesByDecade(decade: string) {
        if (decade && decade !== 'all') {
            this.setFilterName(decade);
            this.loadedMovies = _.filter(this.movies, ({Released}) => {
                const releaseYear = Released.substr(-4, 4);
                if(decade.substr(0,1) === '2') {
                    return releaseYear.substr(0,1) === '2';
                } else {
                    return decade.substr(0,3) === releaseYear.substr(0,3);
                }
            });
        } else {
            this.setFilterName('all');
            this.loadedMovies = this.movies;
        }
    }

    setLocale = (event, lang: string) => {
      this.onLanguageChange.emit(lang);
      event.preventDefault();
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
export interface Btn {
  decade: string;
}
