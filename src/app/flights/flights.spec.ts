import 'rxjs/add/operator/map';

import {
  inject,
  TestBed
} from '@angular/core/testing';
import { Component } from '@angular/core';
import {
  BaseRequestOptions,
  ConnectionBackend,
  Http
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { Flights } from './flights.service';

describe('Flights', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      BaseRequestOptions,
      MockBackend,
      {
        provide: Http,
        useFactory: function(backend: ConnectionBackend, defaultOptions: BaseRequestOptions) {
          return new Http(backend, defaultOptions);
        },
        deps: [MockBackend, BaseRequestOptions]
      },
      Flights
    ]}));

  it('should have http', inject([ Flights ], (flights: Flights) => {
    expect(!!flights.http).toEqual(true);
  }));

  it('should get data from the server', inject([ Flights ], (flights: Flights) => {
    flights.getAll().subscribe(data => {
      expect(typeof data).toEqual('array');
    });
  }));

});
