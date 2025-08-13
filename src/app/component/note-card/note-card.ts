import { Component, Input } from '@angular/core';
import { Note } from '../../interface/commons';

@Component({
  selector: 'app-note-card',
  imports: [],
  templateUrl: './note-card.html',
  styleUrl: './note-card.css',
  standalone: true,
})
export class NoteCard {
  @Input() note!: Note;

  options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };

  formattedDate = new Intl.DateTimeFormat(
    navigator.language,
    this.options
  ).format(new Date(this.note.createdAt));
}
