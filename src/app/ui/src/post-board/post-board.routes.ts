import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostBoardComponent } from './post-board.component';

const routes: Routes = [
    {
        path: '',
        component: PostBoardComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PostBoardRoutingModule {}
