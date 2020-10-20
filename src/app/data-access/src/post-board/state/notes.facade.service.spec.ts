import { async, TestBed } from '@angular/core/testing';
import { NotesFacade } from './notes.facade.service';
import { NotesStore } from './notes.store';
import { NotesService } from './notes.service';
import { readFirst } from '../utils/rxjs/read-first';
import { NotesQuery } from './notes.query';
import { MOCK_NOTES } from '../mocks/mock-notes';
import { Note } from '../models/note';

describe('NotesFacade', () => {
    let facade: NotesFacade;
    let store: NotesStore;
    let query: NotesQuery;
    let api: NotesService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [],
            providers: [NotesFacade, NotesStore, NotesQuery, NotesService],
        });

        facade = TestBed.inject(NotesFacade);
        store = TestBed.inject(NotesStore);
        query = TestBed.inject(NotesQuery);
        api = TestBed.inject(NotesService);
        store.reset();
    }));

    afterEach(() => {
        store.reset();
    });

    describe('initial state', () => {
        it('should not have a selected notes', async (done) => {
            try {
                const list = await readFirst(facade.notes$);
                expect(list.length).toBe(0);

                done();
            } catch (err) {
                done.fail(err);
            }
        });
    });
    describe('load notes', () => {
        it('should load notes from mock with ids', async (done) => {
            try {
                facade.loadNotes();

                const notes = await readFirst(facade.notes$);

                expect(notes.length).toBe(MOCK_NOTES.length);
                expect(notes).toEqual(MOCK_NOTES);

                done();
            } catch (err) {
                done.fail(err);
            }
        });
    });

    describe('add a new note', () => {
        it('should add a new note', async (done) => {
            try {
                facade.loadNotes();
                let notes = await readFirst(facade.notes$);
                expect(notes.length).toBe(MOCK_NOTES.length);

                const note: Note = { id: 15, author: 'Me', content: 'about me', date: null };

                facade.addNote(note);

                notes = await readFirst(facade.notes$);

                expect(notes.length).toBe(MOCK_NOTES.length + 1);

                done();
            } catch (err) {
                done.fail(err);
            }
        });
    });

    describe('update a note', () => {
        it('should update an existing note', async (done) => {
            try {
                facade.loadNotes();
                let notes = await readFirst(facade.notes$);

                const note: Note = notes[5];
                const content = 'new content for number 5';

                const updatedNote = { ...note, content };
                facade.updateNote(updatedNote);

                notes = await readFirst(facade.notes$);

                expect(notes[5].content).toBe(content);

                done();
            } catch (err) {
                done.fail(err);
            }
        });
    });

    describe('delete a note', () => {
        it('should delete an existing note', async (done) => {
            try {
                facade.loadNotes();
                let notes = await readFirst(facade.notes$);

                const note: Note = notes[5];

                expect(notes.includes(note)).toBeTrue();

                facade.deleteNote(note);

                notes = await readFirst(facade.notes$);

                expect(notes.includes(note)).toBeFalse();

                done();
            } catch (err) {
                done.fail(err);
            }
        });
    });
});
