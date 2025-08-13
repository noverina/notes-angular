import { Component, EventEmitter, inject, Output } from '@angular/core';
import { ModalService } from '../../service/modal-service/modal-service';

@Component({
  selector: 'app-toolbar',
  imports: [],
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.css',
  standalone: true,
})
export class Toolbar {
  protected modalService = inject(ModalService);
  @Output() sort = new EventEmitter<string>();
  startSort(event: Event) {
    const type = (event.target as HTMLSelectElement).value;
    this.sort.emit(type);
  }
}
