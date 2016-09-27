import { ElementRef } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';

import { MaterialSelect } from './materialSelect.component';

describe('MaterialSelect', () => {
  const selectElement: Element = document.createElement('select');

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      {
        provide: ElementRef,
        useValue: {
          nativeElement: {
            querySelector: function () {
              return selectElement;
            }
          }
        }
      },
      MaterialSelect
    ]
  }));

  it('should assign element after init', inject([MaterialSelect], (mSelect: MaterialSelect) => {
    expect(mSelect.element).toBe(undefined);
    mSelect.ngOnInit();
    expect(mSelect.element).not.toBe(undefined);
  }));

});
