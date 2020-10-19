import {Component, OnInit} from '@angular/core';
import {FlightService} from "../../services/flight.service";
import {Observable} from "rxjs";
import {Airport, Flight} from "../../models/models";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Sort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  flights$: Observable<Flight[]>;
  airports$: Observable<Airport[]>;
  displayedColumns: string[] = ['destination', 'arrival', 'duration', 'price'];
  searchForm: FormGroup = new FormGroup({
    departure: new FormControl('', [Validators.required]),
    arrival: new FormControl(''),
    dateFrom: new FormControl(''),
    dateTo: new FormControl(''),
    priceFrom: new FormControl(1, [Validators.minLength(1), Validators.maxLength(10000)]),
    priceTo: new FormControl(1, [Validators.minLength(1), Validators.maxLength(10000)]),
    directFlight: new FormControl(true, []),
    connections: new FormControl(1, [Validators.minLength(1)]),
  }, {validators: []})
  private dataSource: MatTableDataSource<unknown>;


  constructor(private flightService: FlightService) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.airports$ = this.flightService.getAirports();
  }

  search() {
    if(this.searchForm.valid) {
      this.flights$ = this.flightService.searchFlights(this.searchForm.value);
    }

  }

}
