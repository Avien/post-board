import { combineLatest, Observable } from 'rxjs';
import { auditTime, map } from 'rxjs/operators';
import { Note } from './note';

export interface PostBoardVideModel {
    notes: Note[];
}

export type PostBoardStreams = [Observable<Note[]>];

/**
 * Build a consolidated stream to expose read-only view model for all 'important' information
 * Utility feature for the UI view emitting a single VM stream
 */
export function makePostBoardViewModel(
    streams: PostBoardStreams,
): Observable<Readonly<PostBoardVideModel>> {
    const toViewModel = ([notes]): PostBoardVideModel => {
        return {
            notes,
        };
    };

    return combineLatest(streams).pipe(auditTime(0), map(toViewModel));
}
