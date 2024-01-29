import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  http = inject(HttpClient);

  constructor() { }

  list() {
    return this.http.get('http://127.0.0.1/api/movies');
  }


}
