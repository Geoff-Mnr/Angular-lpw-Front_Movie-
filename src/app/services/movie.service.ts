import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Movie } from '../models/movie.interface';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MovieService {

  http = inject(HttpClient);

  constructor() { }

  list() {
    return this.http.get<Movie[]>('http://127.0.0.1:8000/api/movies');
  }

  delete(id: number) {
    return this.http.delete<Movie>('http://127.0.0.1:8000/api/movies/'+id);
  }

  update(id: number, movie: Movie) {
    return this.http.put<Movie>('http://127.0.0.1:8000/api/movies/'+id, movie);
  }

  create(movie: Movie) {
    return this.http.post<Movie>('http://127.0.0.1:8000/api/movies', movie);
  }
}