import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';

import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import { MovieListComponent } from './components/movie-list/movie-list.component';
import {OmdbService} from './components/movie-list/omdb.service';
import { DecadeButtonComponent } from './components/decade-button/decade-button.component';
import { OrderByDatePipe } from './components/movie-list/order-by-date.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MovieListComponent,
    DecadeButtonComponent,
    OrderByDatePipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [OmdbService],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
