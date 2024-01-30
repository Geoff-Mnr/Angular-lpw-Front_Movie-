import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Movie } from '../../models/movie.interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-edit',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-edit.component.html',
  styleUrl: './add-edit.component.scss'
})
export class AddEditComponent {

  @Output() addEmitter = new EventEmitter();
  @Output() editEmitter = new EventEmitter();

  @Input() selectedMovie: Movie = {
    id: 0,
    title: '',
    year: 0,
    director: '',
    synopsis: '',
    created_at: new Date(),
    updated_at: new Date()
  }

  /* réinitialise le formulaire */
  ngOnInit() {
    this.selectedMovie = this.clone(this.selectedMovie);
  }

  /* permet de copier un objet */
  private clone(value: any) {
    return JSON.parse(JSON.stringify(value));
  }

  addMovie() {
    this.addEmitter.emit(this.selectedMovie);
  }

  /* permet d'ouvrir un formulaire pour modifier un film */
  editMovie() {
    const toSend = this.clone(this.selectedMovie);
    this.editEmitter.emit(toSend);
  }
}
