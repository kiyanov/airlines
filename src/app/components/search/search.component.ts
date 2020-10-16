import { Component, OnInit } from '@angular/core';
import {FlightService} from "../../services/flight.service";
import {Observable} from "rxjs";
import {Flight} from "../../models/models";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
   flights$: Observable<Flight[]>;

  constructor(private flightService: FlightService) { }

  ngOnInit(): void {
    this.flights$ = this.flightService.getFlights();
  }

}
