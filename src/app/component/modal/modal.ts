import { Component, inject, Input } from '@angular/core';
import { ModalService } from '../../service/modal-service/modal-service';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.html',
  styleUrl: './modal.css',
  standalone: true,
})
export class Modal {
  @Input() type!: 'success' | 'error' | 'form' | 'confirm';
  @Input() title: string = 'Modal';
  icon = '';
  ngOnInit() {
    switch (this.type) {
      case 'success':
        this.icon = 'check';
        this.title = 'Success';
        break;
      case 'error':
        this.icon = 'bug';
        this.title = 'Uh oh! :(';
        break;
      case 'form':
        this.icon = 'forms_add_on';
        break;
      case 'confirm':
        this.icon = 'exclamation';
        this.title = 'Confirmation';
        break;
      default:
        this.icon = 'exclamation';
        break;
    }
  }
  protected modalService = inject(ModalService);
}
