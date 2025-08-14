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
  @Input() title?: string;
  titleInTemplate = '';
  icon = '';
  ngOnInit() {
    switch (this.type) {
      case 'success':
        this.icon = 'check';
        this.titleInTemplate = this.title ?? 'Success';
        break;
      case 'error':
        this.icon = 'bug';
        this.titleInTemplate = this.title ?? 'Uh oh! :(';
        break;
      case 'form':
        this.icon = 'forms_add_on';
        break;
      case 'confirm':
        this.icon = 'exclamation';
        this.titleInTemplate = this.title ?? 'Confirmation';
        break;
      default:
        this.icon = 'exclamation';
        break;
    }
  }
  protected modalService = inject(ModalService);
}
