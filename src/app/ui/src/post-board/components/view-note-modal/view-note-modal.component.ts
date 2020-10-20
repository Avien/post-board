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

    @Output() updateNote: EventEmitter<Note> = new EventEmitter<Note>();
    @Output() deleteNote: EventEmitter<Note> = new EventEmitter<Note>();
    @Output() cancelModal: EventEmitter<void> = new EventEmitter<void>();

    @ViewChild('noteForm') noteForm: NgForm;

    viewModel: Note;
    isNew: boolean;

    constructor() {}

    ngOnInit(): void {}

    onUpdateNote(): void {
        if (this.isNew) {
            this.viewModel.date = new Date().toISOString();
        }

        if (this.noteForm.dirty) {
            this.updateNote.emit(this.viewModel);
        } else {
            this.onCancel();
        }
    }

    onDeleteNote(): void {
        this.deleteNote.emit(this.viewModel);
    }

    onCancel(): void {
        this.cancelModal.emit();
    }
}
