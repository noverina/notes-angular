import { Component, inject } from '@angular/core';
import { Modal } from '../modal/modal';
import { NoteService } from '../../service/note-service/note-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal-form',
  imports: [Modal, FormsModule],
  templateUrl: './modal-form.html',
  styleUrl: './modal-form.css',
  standalone: true,
})
export class ModalForm {
  private noteService = inject(NoteService);
  title: string = '';
  content: string = '';
  onSubmit = () => {
    console.log(this.title, this.content);
  };
}
