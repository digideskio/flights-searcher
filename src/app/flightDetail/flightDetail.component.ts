import { Component } from '@angular/core';
import { ActivatedRoute, RouterState } from '@angular/router';
import { AppState } from '../app.service';
@Component({
  selector: 'detail',
  template: `
    <div class="row">
      <div class="col s12 flight-details-container">
        <div *ngIf="flight" class="col s12">
          <h5>{{flight.id}}Flight details:</h5>
          <hr/>
          <span class="title">From {{flight.departureAirport}} to {{flight.arrivalAirport}}</span>
          <p>Departure: {{flight.localDepartureTime | date:"MM/dd/yyyy HH:mm" }} (CLT), arrival: {{flight.localArrivalTime | date:"MM/dd/yyyy HH:mm"}} (CLT)<br>
          <p>Seats available: {{flight.seatsAvailable}}</p>
          <p>Departure terminal name: {{flight.depTerminalName}}</p>
          <hr/>
          <div *ngIf="flight.prices.adult">>
            <span>Adult prices:</span>
            <ul>
               <li>regular: {{flight.prices.adult.value}} $</li>
               <li>with debit card: {{flight.prices.adult.valueWithDebitCard}} $</li>
               <li>with credit card: {{flight.prices.adult.valueWithCreditCard}} $</li>
            </ul>
          </div>
          <div *ngIf="flight.prices.child">>
            <span>Child prices:</span>
            <ul>
               <li>regular: {{flight.prices.child.value}} $</li>
               <li>with debit card: {{flight.prices.child.valueWithDebitCard}} $</li>
               <li>with credit card: {{flight.prices.child.valueWithCreditCard}} $</li>
            </ul>
          </div>
          <div *ngIf="flight.prices.infant">>
            <span>Infant prices:</span>
            <ul>
               <li>regular: {{flight.prices.infant.value}} $</li>
               <li>with debit card: {{flight.prices.infant.valueWithDebitCard}} $</li>
               <li>with credit card: {{flight.prices.infant.valueWithCreditCard}} $</li>
            </ul>
          </div>
          <p *ngIf="flight.isDisrupted">Disrupted!</p><br/>
        </div>
        <div *ngIf="!flight" class="col s12">
          <h5>Please choose some flight first!</h5>
        </div>
      </div>
    </div>
  `
})
export class FlightDetail {

  public flight: any;
  constructor(public route: ActivatedRoute, public appState: AppState) { }

  ngOnInit() {
    this.route
      .data
      .subscribe((data: any) => {
        this.flight = this.appState.get('flightDetails');
      });
  }

}
