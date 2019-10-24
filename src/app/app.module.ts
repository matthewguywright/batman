import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import { AppComponent } from './app.component';

import { MovieListComponent } from './components/movie-list/movie-list.component';
import {OmdbService} from "./components/movie-list/omdb.service";

@NgModule({
  declarations: [
    AppComponent,
    MovieListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [OmdbService],
  bootstrap: [AppComponent]
})
export class AppModule { }
