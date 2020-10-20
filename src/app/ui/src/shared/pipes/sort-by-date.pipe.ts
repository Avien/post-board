import { Pipe, PipeTransform } from '@angular/core';
import { Note } from '../../../../data-access/src/post-board/models/note';

@Pipe({
    name: 'sortByDate',
})
export class SortByDatePipe implements PipeTransform {
    transform(value: Note[]): unknown {
        return value.sort((a, b) => {
            return a.date < b.date ? -1 : a.date > b.date ? 1 : 0;
        });
    }
}
