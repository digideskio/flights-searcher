import { Routes } from '@angular/router';
import { Home } from './home';
import { About } from './about';
import { NoContent } from './no-content';

import {FlightDetail} from "./flightDetail/flightDetail.component";


export const ROUTES: Routes = [
  { path: '',      component: Home },
  { path: 'home',  component: Home },
  { path: 'about', component: About },
  { path: 'details', component: FlightDetail },
  { path: '**',    component: NoContent },
];
