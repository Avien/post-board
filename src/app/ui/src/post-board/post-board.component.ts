import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Note } from '../../../data-access/src/post-board/models/note';
import { NotesFacade } from '../../../data-access/src/post-board/state/notes.facade.service';

@Component({
    selector: 'app-post-board',
    templateUrl: './post-board.component.html',
    styleUrls: ['./post-board.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostBoardComponent implements OnInit {
    showNoteModal: boolean;
    selectedNote: Note;

    trackBy = (index: number, note: Note) => {
        return note.id;
    };

    constructor(public facade: NotesFacade) {}

    ngOnInit(): void {
        this.facade.loadNotes();
    }

    editNote(note): void {
        this.selectedNote = note;
        this.openViewNoteModal();
    }

    openViewNoteModal(isNew?: boolean): void {
        if (isNew) {
            this.selectedNote = null;
        }
        this.showNoteModal = true;
    }

    closeNoteModal(): void {
        this.showNoteModal = false;
    }

    onUpdateNote(note: Note): void {
        this.selectedNote ? this.facade.updateNote(note) : this.facade.addNote(note);
        this.closeNoteModal();
    }

    onDeleteNote(note: Note): void {
        this.facade.deleteNote(note);
        this.closeNoteModal();
    }
}
