import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';
import { Note } from '../../../../../data-access/src/post-board/models/note';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-view-note-modal',
    templateUrl: './view-note-modal.component.html',
    styleUrls: ['./view-note-modal.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewNoteModalComponent implements OnInit {
    @Input() set note(value: Note) {
        if (value) {
            // edit note
            this.viewModel = { ...value };
        } else {
            // new note
            this.isNew = true;
            this.viewModel = {
                author: '',
                content: '',
                date: '',
                id: -1,
            };
        }
    }

    @Output() updateNote: EventEmitter<Note> = new EventEmitter<Note>(); // notify parent on update note
    @Output() deleteNote: EventEmitter<Note> = new EventEmitter<Note>(); // notify parent on delete note
    @Output() cancelModal: EventEmitter<void> = new EventEmitter<void>(); // notify parent on modal close

    @ViewChild('noteForm') noteForm: NgForm;

    viewModel: Note;
    isNew: boolean;

    constructor() {}

    ngOnInit(): void {}

    /**
     * Event handler for adding/updating a note
     */
    onUpdateNote(): void {
        if (this.isNew) {
            // only new notes are set with creation date
            this.viewModel.date = new Date().toISOString();
        }

        if (this.noteForm.dirty) {
            // update change in note
            this.updateNote.emit(this.viewModel);
        } else {
            // no change to note, close modal
            this.onCancel();
        }
    }

    /**
     * Event handler for deleting a note
     */
    onDeleteNote(): void {
        this.deleteNote.emit(this.viewModel);
    }

    /**
     * Event handler for dismissing the modal
     */
    onCancel(): void {
        this.cancelModal.emit();
    }
}
