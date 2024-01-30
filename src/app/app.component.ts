import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { Movie } from './models/movie.interface';
import { MovieService } from './services/movie.service';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ListComponent, CommonModule, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})


export class AppComponent {
  title = 'front_movie';

  service = inject(MovieService);

  showList = false;

}
