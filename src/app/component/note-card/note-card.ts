import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Note } from '../../interface/commons';
import { ModalService } from '../../service/modal-service/modal-service';

@Component({
  selector: 'app-note-card',
  imports: [],
  templateUrl: './note-card.html',
  styleUrl: './note-card.css',
  standalone: true,
})
export class NoteCard {
  protected modalService = inject(ModalService);
  @Input() note!: Note;

  options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };
  get formattedDate(): string {
    if (!this.note?.createdAt) return '';
    return new Intl.DateTimeFormat(navigator.language, this.options).format(
      new Date(this.note.createdAt)
    );
  }

  @Output() toBeDeleted = new EventEmitter<string>();
  sendId() {
    this.toBeDeleted.emit(this.note.id);
  }
}
