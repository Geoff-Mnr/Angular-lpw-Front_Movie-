import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { List } from '../models/list.interface';
import { Movie } from '../models/movie.interface';


@Injectable({
  providedIn: 'root'
})
export class MovieService {

  http = inject(HttpClient);

  constructor() { }

  list() {
    return this.http.get<List<Movie>>('http://127.0.0.1/api/movies');
  }


}
