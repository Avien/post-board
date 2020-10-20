import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { map } from 'rxjs/operators';
import { RoleType } from '../../../../data-access/src/post-board/models/role-type.enum';

@Injectable({
    providedIn: 'root',
})
export class AuthorizationGuard implements CanActivate {
    constructor(private userService: UserService, private router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.userService.user$.pipe(
            map((user) => {
                if (user) {
                    if ([RoleType.ADMIN, RoleType.ENABLEMENT].includes(user.role)) {
                        return true;
                    }
                    // TODO: pop toaster with error or redirect to a nice error page
                    const errorMsg = 'Unauthorized user';
                    console.error(errorMsg);
                    alert(errorMsg);
                    return false;
                }
                this.router.navigate(['/login']);
                return false;
            }),
        );
    }
}
