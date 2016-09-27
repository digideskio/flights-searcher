import 'materialize-css/dist/js/materialize';

import { Component, ViewEncapsulation } from '@angular/core';

import { AppState } from './app.service';

import './rxjs-operators';

@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.style.css'
  ],
  template: `
    <nav>
      <div class="nav-wrapper">
        <a href="#" class="brand-logo" [routerLink]=" ['./'] ">
          Flights Searcher
        </a>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li><a [routerLink]=" ['./about'] ">About</a></li>
        </ul>
      </div>
    </nav>

    <main>
      <router-outlet></router-outlet>
    </main>
  `
})
export class App {
  name = 'Angular 2 Flights Searcher';
  url = '';

  constructor(
    public appState: AppState) {

  }

  ngOnInit() {
    console.log('Initial App State', this.appState.state);
  }

}
