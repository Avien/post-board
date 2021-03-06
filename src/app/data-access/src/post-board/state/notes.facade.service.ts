import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Note } from '../models/note';
import { filter, map, take, tap } from 'rxjs/operators';
import { makePostBoardViewModel, PostBoardVideModel } from '../models/post-board.view-model';
import { NotesQuery } from './notes.query';
import { NotesStore } from './notes.store';
import { NotesService } from './notes.service';

@Injectable()
export class NotesFacade {
    readonly notes$: Observable<Note[]> = this.query.notes$;

    vm$: Observable<PostBoardVideModel>;
    private notes: Note[];

    constructor(
        private service: NotesService,
        private query: NotesQuery,
        private store: NotesStore,
    ) {
        this.vm$ = makePostBoardViewModel([this.notes$]).pipe(
            tap((vm) => {
                this.notes = vm.notes;
            }),
        );
    }

    /**
     * Load notes from store if exists, if not fetch from data service (backend or mocked notes in this case)
     */
    loadNotes(): void {
        if (this.query.hasEntity()) {
            this.store.setActive(this.store.getValue().ids);
        } else {
            const notes$ = this.service.loadNotes();
            const updateStore = (notes: Note[]) => {
                if (notes.length) {
                    this.notes = notes;
                    this.store.addNotes(notes);
                }
            };

            notes$
                .pipe(
                    take(1),
                    filter((f) => !!f),
                )
                .subscribe(updateStore);
        }
    }

    /**
     * Add new note
     * @param note
     */
    addNote(note: Note): void {
        note.id = this.notes.length + 1;
        this.store.addNotes([note]);
    }

    /**
     * update note
     * @param note
     */
    updateNote(note: Note): void {
        this.store.updateNote(note);
    }

    /**
     * delete note
     * @param note
     */
    deleteNote(note: Note): void {
        this.store.deleteNote(note);
    }
}
