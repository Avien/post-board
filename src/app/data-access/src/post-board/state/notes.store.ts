import { Injectable } from '@angular/core';
import { produce } from 'immer';
import { transaction, MultiActiveState } from '@datorama/akita';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Note } from '../models/note';

export interface NotesState extends EntityState<Note, number>, MultiActiveState {}

/**
 * Initial configuration for a blank store
 */
const initialState: NotesState = {
    active: [],
};

@Injectable()
@StoreConfig({
    idKey: 'id',
    name: 'notes',
    resettable: true,
    producerFn: produce,
})
export class NotesStore extends EntityStore<NotesState> {
    constructor() {
        super(initialState);
    }

    @transaction()
    addNotes(items: Note[]): void {
        this.setLoading(true);
        this.upsertMany(items || []);
        this.setLoading(false);
        this.setActive(this.getValue().ids);
    }

    @transaction()
    updateNote(note: Note): void {
        this.setLoading(true);
        this.update(note.id, note);
        this.setLoading(false);
    }
    @transaction()
    deleteNote(item: Note): void {
        this.setLoading(true);
        this.remove((entity) => entity.id === item.id);
        this.setLoading(false);
    }
}
