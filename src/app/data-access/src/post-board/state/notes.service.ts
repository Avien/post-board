import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Note } from '../models/note';
import { MOCK_NOTES } from '../mocks/mock-notes';

@Injectable()
export class NotesService {
    constructor() {}

    /**
     * load initial notes from mock file, should be replaced with endpoint on real app
     */
    loadNotes(): Observable<Note[]> {
        return of(MOCK_NOTES);
    }
}
