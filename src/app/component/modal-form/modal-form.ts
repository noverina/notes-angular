import { ModalService } from './../../service/modal-service/modal-service';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Modal } from '../modal/modal';
import { NoteService } from '../../service/note-service/note-service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InsertNote } from '../../interface/commons';

@Component({
  selector: 'app-modal-form',
  imports: [Modal, ReactiveFormsModule],
  templateUrl: './modal-form.html',
  styleUrl: './modal-form.css',
  standalone: true,
})
export class ModalForm {
  private noteService = inject(NoteService);
  form = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30),
    ]),
    content: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(500),
    ]),
  });

  private modalService = inject(ModalService);
  @Output() refresh = new EventEmitter<void>();
  onSubmit() {
    if (this.form.valid) {
      const { title, content } = this.form.value;
      const payload: InsertNote = { title: title!, content: content! };
      this.noteService.insertNote(payload).subscribe({
        next: (response) => {
          if (!response.isError) {
            this.modalService.close();
            this.refresh.emit();
          } else {
            this.modalService.open({ key: 'error', type: 'error' });
          }
        },
        error: (err) => {
          this.modalService.open({ key: 'error', type: 'error' });
        },
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
