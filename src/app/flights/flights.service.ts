import { Injectable } from '@angular/core';
import { Http } from '@angular/http';


@Injectable()
export class Flights {
  constructor(public http: Http) { }

  public getAll() {
    return this.http.get('http://ejtestbed.herokuapp.com/flights').map(res => res.json());
  }
}
