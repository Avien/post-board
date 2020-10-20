import { TestBed } from '@angular/core/testing';
import { NotesFacade } from './notes.facade.service';

describe('NotesFacade', () => {
    let service: NotesFacade;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(NotesFacade);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
