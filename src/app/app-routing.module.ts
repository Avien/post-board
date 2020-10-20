import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorizationGuard } from './ui/src/shared/guards/authorization.guard';
import { LoginComponent } from './ui/src/login/login.component';

const routes: Routes = [
    {
        path: '',
        loadChildren: () =>
            // lazy load route
            import('./ui/src/post-board/post-board.module').then((m) => m.PostBoardModule),
        canActivate: [AuthorizationGuard],
    },
    {
        path: 'login',
        component: LoginComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
