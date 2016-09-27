import { Component, EventEmitter, Input, ElementRef } from '@angular/core';
import { Output, OnInit, OnChanges, SimpleChange } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'material-select',
  template: `
    <div class="input-field">
      <select>
        <option value="" disabled selected>{{placeholder}}</option>
        <option *ngFor="let option of options"  [value]="option">{{option}}</option>
      </select>
      <label for="date-input" >{{label}}</label>
    </div>
  `
})
export class MaterialSelect implements OnInit, OnChanges {

  @Input() public label: string;

  @Input() public options: Array<string>;

  @Input() public placeholder: string = 'Choose your option';

  @Input() public selected: string;

  @Output() public selectedChange: EventEmitter<string>;

  public element: Element;

  constructor( public elementRef: ElementRef ) {
    this.selectedChange = new EventEmitter<string>();
  }

  ngOnInit() {
    this.element = this.elementRef.nativeElement;
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    if (changes['options'] && this.element) {
      setTimeout(() => $(this.element.querySelector('select'))
        .material_select(this.onSelectedChange.bind(this)));
    }
  }

  onSelectedChange() {
    this.selectedChange.emit(this.element.querySelector('select').value);
  }

}
