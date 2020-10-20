import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NotesStore, NotesQuery, NotesFacade, NotesService } from './state';

@NgModule({
    imports: [CommonModule],
    providers: [NotesStore, NotesQuery, NotesFacade, NotesService],
})
export class PostBoardDataAccessModule {}
