import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Movie } from '../../models/movie.interface';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';


@Component({
  selector: 'app-add-edit',
  standalone: true,
  imports: [FormsModule, CommonModule, DatePipe],
  templateUrl: './add-edit.component.html',
  styleUrl: './add-edit.component.scss',
  providers: [DatePipe]
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

  constructor(private datePipe: DatePipe) { }

  formatDate(date: Date) {
    return this.datePipe.transform(date, 'HH:mm le dd-MM-yyyy');
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
