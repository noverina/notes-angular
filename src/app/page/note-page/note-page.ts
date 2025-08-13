import { Component, inject } from '@angular/core';
import { NoteCard } from '../../component/note-card/note-card';
import { CommonModule } from '@angular/common';
import { Note } from '../../interface/commons';
import { NoteService } from '../../service/note-service/note-service';
import { Toolbar } from '../../component/toolbar/toolbar';
import { Modal } from '../../component/modal/modal';
import { toSignal } from '@angular/core/rxjs-interop';
import { ModalService } from '../../service/modal-service/modal-service';
import { ModalForm } from '../../component/modal-form/modal-form';

@Component({
  selector: 'app-note-page',
  imports: [CommonModule, NoteCard, Toolbar, Modal, ModalForm],
  templateUrl: './note-page.html',
  styleUrl: './note-page.css',
})
export class NotePage {
  private modalService = inject(ModalService);
  private noteService = inject(NoteService);

  notes: Note[] = [];
  modalSignal = toSignal(this.modalService.modal$, {
    initialValue: null,
  });

  constructor() {
    this.noteService.getAllNotes().subscribe((response) => {
      if (!response.isError) {
        this.notes = response.data!;
      } else {
        this.modalService.open({ key: 'error', type: 'error' });
      }
    });
  }
}
