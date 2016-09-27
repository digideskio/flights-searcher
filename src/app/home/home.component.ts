import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AppState } from '../app.service';
import { Flights } from '../flights/flights.service';

import * as _ from 'lodash';

@Component({
  selector: 'home',
  providers: [
    Flights
  ],
  styleUrls: [ './home.style.css' ],
  templateUrl: './home.template.html'
})
export class Home implements OnInit {

  public departures: Array<string> = [];

  public destinations: Array<string> = [];

  public availableFlights: Array<any> = [];

  public filteredFlights: Array<any> = [];

  public flightQuery: any = {
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
  };

  constructor( public appState: AppState, public flights: Flights, public router: Router ) { }

  ngOnInit() {
    this.flights.getAll().subscribe(data => {
      this.availableFlights = data;
      this.filteredFlights = data;
      this.departures = _(data).map(f => f['departureAirport']).uniq().value();
      this.destinations = _(data).map(f => f['arrivalAirport']).uniq().value();
    });
  }

  onDetailsClick(flight) {
    this.appState.set('flightDetails', flight);
    this.router.navigate(['./details']);
  }

  search() {
    const filtersToApply: Array<any> = this.applyFilters();
    this.filteredFlights = this.availableFlights.filter(
      flight => filtersToApply.every(
        test => {
          const field = Object.keys(test)[0];
          return test[field](flight[field]);
        })
    );
  }

  applyFilters() {
    const passengersCount = _.values(this.flightQuery.passengers).reduce((a, b) => a + b, 0);
    const filtersToApply: Array<any> = _.reduce(this.flightQuery.departure, (memo, value, key) => {
      if (!_.isEmpty(value)) {
        memo.push({[key]: (name: string) => name === value});
      }
      return memo;
    }, [{'seatsAvailable': (seats: number) => seats >= passengersCount}]);
    if (_.isDate(this.flightQuery.localDepartureTime)) {
      filtersToApply.push({localDepartureTime:
        (date) => new Date(date).toLocaleDateString() ===
        new Date(this.flightQuery.localDepartureTime).toLocaleDateString()
      });
    }
    return filtersToApply;
  }
}
