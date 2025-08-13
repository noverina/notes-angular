import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { HttpResponse } from '../../interface/commons';
import { Note } from '../../interface/commons';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  constructor(private http: HttpClient) {}

  private readonly BASE_URL = environment.baseUrl;

  getAllNotes(): Observable<HttpResponse<Note[] | null>> {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return this.http.get<HttpResponse<Note[] | null>>(
      `${this.BASE_URL}/note?timezone=${timezone}`
    );
  }

  insertNote(payload: Partial<Note>): Observable<HttpResponse<null>> {
    return this.http.post<HttpResponse<null>>(`${this.BASE_URL}/note`, payload);
  }

  deleteNote(id: String): Observable<HttpResponse<null>> {
    return this.http.delete<HttpResponse<null>>(`${this.BASE_URL}/note/${id}`);
  }
}
