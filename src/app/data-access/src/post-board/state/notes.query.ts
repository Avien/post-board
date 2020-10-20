import { Injectable } from '@angular/core';
import { SelectOptions } from '@datorama/akita/lib/types';

import { QueryEntity } from '@datorama/akita';

import { Observable } from 'rxjs';

import { NotesState, NotesStore } from './notes.store';
import { Note } from '../models/note';

@Injectable()
export class NotesQuery extends QueryEntity<NotesState, Note> {
    notes$: Observable<Note[]> = this.selectActive();

    constructor(protected store: NotesStore) {
        super(store);
    }

    /**
     * Only select utterances associated with the specified conversation id
     */
    selectById(id: number): Observable<Note[]> {
        return this.selectAll({
            filterBy: (it: Note) => it.id === id,
        });
    }
}
