import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { Observable } from 'rxjs';
import { NotesState, NotesStore } from './notes.store';
import { Note } from '../models/note';

@Injectable()
export class NotesQuery extends QueryEntity<NotesState, Note> {
    // active notes in store
    notes$: Observable<Note[]> = this.selectActive();

    constructor(protected store: NotesStore) {
        super(store);
    }
}
