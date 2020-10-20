import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
} from '@angular/core';
import { Note } from '../../../../../data-access/src/post-board/models/note';

@Component({
    selector: 'app-note',
    templateUrl: './note.component.html',
    styleUrls: ['./note.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteComponent implements OnInit {
    @Input() note: Note;
    @Input() isNew: boolean;

    @Output() addNewNote: EventEmitter<void> = new EventEmitter<void>();

    constructor() {}

    ngOnInit(): void {}

    handleAddNewNote(): void {
        this.addNewNote.emit();
    }
}
