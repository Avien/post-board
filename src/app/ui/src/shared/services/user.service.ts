import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../../../../data-access/src/post-board/models/user';
import { map } from 'rxjs/operators';
import { MOCK_USERS } from '../../../../data-access/src/post-board/mocks/mock-users';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private userSource = new BehaviorSubject<User>(null);

    user$: Observable<User>;
    isLoggedIn$: Observable<boolean>;

    constructor() {
        this.user$ = this.userSource.asObservable();
        this.isLoggedIn$ = this.user$.pipe(map((user) => !!user));
    }

    login(user: User): void {
        this.userSource.next(user);
    }

    getUsers(): Observable<User[]> {
        return of(MOCK_USERS);
    }
}
