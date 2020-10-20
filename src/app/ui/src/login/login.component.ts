import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { Observable } from 'rxjs';
import { User } from '../../../data-access/src/post-board/models/user';
import { MOCK_USERS } from '../../../data-access/src/post-board/mocks/mock-users';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
    users$: Observable<User[]>;
    selectedUser: User = MOCK_USERS[0];

    constructor(private userService: UserService, private router: Router) {}

    ngOnInit(): void {
        this.users$ = this.userService.getUsers();
    }

    login(): void {
        this.userService.login(this.selectedUser);

        this.router.navigate(['./']);
    }
}
