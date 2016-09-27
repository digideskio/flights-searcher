import { Component, ElementRef } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';

// Load the implementations that should be tested
import { Datepicker } from './datepicker.component';

describe('Datepicker', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      // provide a better mock
      {
        provide: ElementRef,
        useValue: {
          nativeElement: {
            querySelector: () => {
              return {
                blur: function () { },
                value: 'default value'
              };
            }
          }
        }
      },
      Datepicker
    ]
  }));

  it('should register and set initial value', inject([Datepicker], (datepicker: Datepicker) => {
    spyOn(datepicker, 'initializeDatePickerWithStartingValue');
    datepicker.ngOnInit();
    expect(datepicker.initializeDatePickerWithStartingValue).toHaveBeenCalled();
  }));

});
