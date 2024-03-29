import { Component, Input, OnInit, inject } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie.interface';
import { RouterLink } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { AddEditComponent } from '../add-edit/add-edit.component';
import { Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';



@Component({
  selector: 'app-list',
  standalone: true,
  imports: [RouterLink, CommonModule, DatePipe, AddEditComponent],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']  // Modifié ici
})
export class ListComponent implements OnDestroy {

  service = inject(MovieService);
  selectedMovie?: Movie;
  private subDelete: Subscription | undefined;

  movies: Movie[] = [];

  displayForm = false;

  ngOnInit() {
    this.getAllMovies();
  }

  /*Methode pour afficher le formulaire d'ajout*/
  getAllMovies() {
    this.subDelete = this.service.list().subscribe((result: any) => {
      console.log(result);
      this.movies = result.data;
    });
  }

  /*Methode pour selectionner un film*/
  selectMovie(item: Movie) {
    this.selectedMovie = item;
    console.log(this.selectedMovie);
  }

  updateMovie(item: Movie) {
    this.subDelete = this.service.update(item.id, item).subscribe({
      next: () => {
        console.log('Movie updated successfully');
        this.getAllMovies();
        this.closeEditForm();
      },
      error: (error) => {
        console.error('Error updating movie:', error);
      }
    });

  }

  createMovie(item: Movie) {
    this.subDelete = this.service.create(item).subscribe({
      next: () => {
        console.log('Movie created successfully');
        this.getAllMovies();
        this.closeAddForm();
        this.closeEditForm();
      },
      error: (error) => {
        console.error('Error creating movie:', error);
      }
    });
  }

  // Méthode pour supprimer un film
  deleteMovie(item: Movie) {
    this.subDelete = this.service.delete(item.id).subscribe({
      next: () => {
        console.log('Movie deleted successfully');
        this.getAllMovies();
      },
      error: (error) => {
        console.error('Error deleting movie:', error);
      }
    });
  }



  /*Methode pour fermer le formulaire d'ajout*/
  private closeAddForm() {
    this.displayForm = false;
  }

  /*Methode pour fermer le formulaire de modification*/
  private closeEditForm() {
    this.selectedMovie = undefined;
  }

  ngOnDestroy() {
    if (this.subDelete) {
      this.subDelete.unsubscribe();
    }
  }
}
