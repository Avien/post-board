import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostBoardComponent } from './post-board.component';
import { NoteComponent } from './components/note/note.component';
import { ViewNoteModalComponent } from './components/view-note-modal/view-note-modal.component';
import { SortByDatePipe } from '../shared/pipes/sort-by-date.pipe';
import { PostBoardDataAccessModule } from '../../../data-access/src/post-board/post-board.data-access.module';
import { FormsModule } from '@angular/forms';
import { PostBoardRoutingModule } from './post-board.routes';

@NgModule({
    declarations: [PostBoardComponent, NoteComponent, ViewNoteModalComponent, SortByDatePipe],
    imports: [CommonModule, FormsModule, PostBoardRoutingModule, PostBoardDataAccessModule],
})
export class PostBoardModule {}
