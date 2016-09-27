import {
  inject,
  TestBed
} from '@angular/core/testing';
import { Router } from '@angular/router';
import {
  BaseRequestOptions,
  ConnectionBackend,
  Http
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';

// Load the implementations that should be tested
import { AppState } from '../app.service';
import { Home } from './home.component';
import { Flights } from  '../flights/flights.service';

const exampleFlights = [
  {
    'id': 'A',
    'departureAirport': 'Paris',
    'arrivalAirport': 'Prague',
    'depTerminalName': 'North Terminal',
    'localDepartureTime': '2016-07-30T08:40:00',
    'localArrivalTime': '2016-07-30T11:45:00',
    'seatsAvailable': 1
  },
  {
    'id': 'B',
    'departureAirport': 'London',
    'arrivalAirport': 'Berlin',
    'depTerminalName': 'South Terminal',
    'localDepartureTime': '2016-06-30T08:40:00',
    'localArrivalTime': '2016-06-30T11:45:00',
    'seatsAvailable': 2
  }
];

describe('Home', () => {
  // provide our implementations or mocks to the dependency injector
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
      {
        provide: Router,
        useValue: {
          navigate: () => {}
        }
      },
      AppState,
      Flights,
      Home
    ]
  }));

  it('should have default empty query parameter', inject([ Home ], (home: Home) => {
    expect(home.flightQuery).toEqual({
      localDepartureTime: null,
      departure: {
        departureAirport: '',
        arrivalAirport: ''
      },
      passengers: {
        adults: 1,
        children: 0,
        infants: 0
      }
    });
  }));

  it('should not filter data with default query', inject([ Home ], (home: Home) => {
    home.availableFlights = exampleFlights;

    const filters = home.applyFilters();
    expect(filters.length).toEqual(1);
    expect(Object.keys(filters[0])[0]).toEqual('seatsAvailable');

    home.search();
    expect(home.filteredFlights).toEqual(home.availableFlights);
  }));

  it('should filter flights by date', inject([ Home ], (home: Home) => {
    home.availableFlights = exampleFlights;
    home.flightQuery.localDepartureTime = new Date('2016-07-30T08:40:00');

    const filters = home.applyFilters();
    expect(filters.length).toEqual(2);
    expect(Object.keys(filters[0])[0]).toEqual('seatsAvailable');
    expect(Object.keys(filters[1])[0]).toEqual('localDepartureTime');

    console.log('localDepartureTime', home.flightQuery.localDepartureTime);
    home.search();
    expect(home.filteredFlights.length).toEqual(1);
    expect(home.filteredFlights[0]).toEqual(home.availableFlights[0]);
  }));

  it('should filter flights by departure', inject([ Home ], (home: Home) => {
    home.availableFlights = exampleFlights;
    home.flightQuery.departure.departureAirport = 'London';

    const filters = home.applyFilters();
    expect(filters.length).toEqual(2);
    expect(Object.keys(filters[0])[0]).toEqual('seatsAvailable');
    expect(Object.keys(filters[1])[0]).toEqual('departureAirport');

    console.log('localDepartureTime', home.flightQuery.localDepartureTime);
    home.search();
    expect(home.filteredFlights.length).toEqual(1);
    expect(home.filteredFlights[0]).toEqual(home.availableFlights[1]);
  }));

  it('should filter flights by number of seats', inject([ Home ], (home: Home) => {
    home.availableFlights = exampleFlights;
    home.flightQuery.passengers.children = 1;

    const filters = home.applyFilters();
    expect(filters.length).toEqual(1);
    expect(Object.keys(filters[0])[0]).toEqual('seatsAvailable');

    home.search();
    expect(home.filteredFlights.length).toEqual(1);
    expect(home.filteredFlights[0]).toEqual(home.availableFlights[1]);
  }));
});
