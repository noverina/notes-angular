import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

export interface ModalState {
  key: string;
  type: 'success' | 'error' | 'form' | 'confirm';
}

@Injectable({ providedIn: 'root' })
export class ModalService {
  private modalSubject = new BehaviorSubject<ModalState | null>(null);
  modal$ = this.modalSubject.asObservable();

  open(modal: ModalState) {
    this.modalSubject.next(modal);
  }

  close() {
    this.modalSubject.next(null);
  }
}
