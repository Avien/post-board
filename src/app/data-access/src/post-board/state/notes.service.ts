import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Note } from '../models/note';
import { MOCK_NOTES } from '../mocks/mock-notes';

@Injectable()
export class NotesService {
    constructor() {}

    loadNotes(): Observable<Note[]> {
        return of(MOCK_NOTES);
    }
}
