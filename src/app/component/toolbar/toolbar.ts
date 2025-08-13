import { Component, inject } from '@angular/core';
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
}
