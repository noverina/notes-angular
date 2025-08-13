import { Component, inject, signal } from '@angular/core';
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
  modalSignal = toSignal(this.modalService.modal$, {
    initialValue: null,
  });

  protected noteService = inject(NoteService);
  notes = signal<Note[]>([]);
  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.noteService.getAllNotes().subscribe((response) => {
      if (!response.isError) {
        this.notes.set([...response.data!]);
      } else {
        this.modalService.open({ key: 'error', type: 'error' });
      }
    });
  }

  sortData(type: string) {
    let sorted = this.notes();
    if (type === 'title') {
      sorted = sorted.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      sorted = sorted.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
    }

    this.notes.set([...sorted]);
  }

  selectedId = signal<string>('');
  onDeleteRequest(id: string) {
    this.selectedId.set(id);
    this.modalService.open({ key: 'confirm-delete', type: 'confirm' });
  }

  onDelete() {
    this.noteService.deleteNote(this.selectedId()).subscribe((response) => {
      if (!response.isError) {
        this.modalService.close();
        this.getData();
      } else {
        this.modalService.open({ key: 'error', type: 'error' });
      }
    });
  }
}
