import { Component, EventEmitter, Input, ElementRef, Output, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'datepicker',
  template: `
    <div class="input-field">
      <input class="date-input" 
        [disabled]="disabled" 
        (click)="open()" 
        [value]='date | date' type='date' />
      <label for="date-input" >{{label}}</label>
    </div>
  `
})
export class Datepicker implements OnInit {

  public static DEFAULT_PARAMS: Object = {
    container: document.body
  };

  @Input() public date: Date;

  @Input() public label: string;

  @Input() public disabled: boolean;

  @Input() public params: Object;

  @Output() public dateChange: EventEmitter<Date>;

  public picker: any;

  constructor(public elementRef: ElementRef) {
    this.dateChange = new EventEmitter<Date>();
  }

  ngOnInit() {
    let element: Element = this.elementRef.nativeElement;
    this.registerAsDatePicker(element.querySelector('input'));
  }

  public initializeDatePickerWithStartingValue(el: Element, mergedParams: Object, date: Date) {
    let dateInput: any = $(el).pickadate(mergedParams);
    this.picker = dateInput.pickadate('picker');
    this.picker.set('select', date);
  }

  private registerAsDatePicker(element) {
    let mergedParams = {};
    Object.assign(mergedParams, Datepicker.DEFAULT_PARAMS, this.params,
      {
        onSet: (result) => this.onDateChange(result),
        onClose: () => element.blur()
      });
    this.initializeDatePickerWithStartingValue(element, mergedParams, this.date);
  }



  private onDateChange(dateChangeResult: DatePickerChanges) {
    switch (Object.keys(dateChangeResult)[0]) {
      case 'highlight':
        return;
      case 'select':
        const selectedDate: Date =
          dateChangeResult.select ? this.extractDate(dateChangeResult.select) : null;
        this.dateChange.emit(selectedDate);
        break;
      case 'clear':
        this.dateChange.emit(null);
        break;
      default:
        return;
    }
  }

  private extractDate(selectedDate: number) {
    let newDate = new Date(selectedDate);
    if (this.date) {
      newDate.setHours(
        this.date.getHours(),
        this.date.getMinutes(),
        this.date.getSeconds(),
        this.date.getMilliseconds()
      );
    }
    return newDate;
  }

  private open() {
    this.picker.open();
  }

}

interface DatePickerChanges {
  highlight: {
    pick: number;
  };
  select: number;
  clear: number;
}
