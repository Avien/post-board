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
        // load data from storage/data service
        this.facade.loadNotes();
    }

    /**
     * view/edit existing note in a modal
     * @param note
     */
    editNote(note): void {
        this.selectedNote = note;
        this.openViewNoteModal();
    }

    /**
     * 2 options to open the mode, new/edit note
     * @param isNew
     */
    openViewNoteModal(isNew?: boolean): void {
        if (isNew) {
            this.selectedNote = null;
        }
        this.showNoteModal = true;
    }

    closeNoteModal(): void {
        this.showNoteModal = false;
    }

    /**
     * Event handler for note update from the modal
     * If selected note, update it, else add new
     * @param note
     */
    onUpdateNote(note: Note): void {
        this.selectedNote ? this.facade.updateNote(note) : this.facade.addNote(note);
        this.closeNoteModal();
    }

    /**
     * Event handler for deleting a note from the modal
     * @param note
     */
    onDeleteNote(note: Note): void {
        this.facade.deleteNote(note);
        this.closeNoteModal();
    }
}
