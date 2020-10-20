import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

/**
 * convert an observable to a promise for convenience
 * @param observable
 */
export function readFirst<T>(observable: Observable<T>): Promise<T> {
    return observable.pipe(first()).toPromise();
}
