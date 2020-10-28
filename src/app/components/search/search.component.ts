import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FlightService} from '../../services/flight.service';
import {Observable} from 'rxjs';
import {Airport, Flight} from '../../models/models';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, AfterViewInit {
  // flights$: Observable<Flight[]>;
  airports$: Observable<Airport[]>;
  displayedColumns: string[] = ['departure.airport.iata', 'departure.airport.city', 'arrival.airport.iata', 'arrival.airport.city', 'duration', 'price'];
  searchForm: FormGroup = new FormGroup({
    departure: new FormControl('', [Validators.required]),
    arrival: new FormControl(''),
    dateFrom: new FormControl(''),
    dateTo: new FormControl(''),
    priceFrom: new FormControl(20, [Validators.minLength(1), Validators.maxLength(10000)]),
    priceTo: new FormControl(100, [Validators.minLength(1), Validators.maxLength(10000)]),
    directFlight: new FormControl(true, []),
    connections: new FormControl(1, [Validators.minLength(1)]),
  }, {validators: []});
  dataSource: MatTableDataSource<Flight>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private flightService: FlightService) {

  }

  ngAfterViewInit(): void {
    this.dataSource.sortingDataAccessor = (item: Flight, property: string) => {

      if (property.includes('.')) {
        const accessor = property.split('.');
        let value: any = item;
        accessor.forEach((a) => {
          value = value[a];
        });
        return value;
      }
      return item[property];
    };
    this.dataSource.filterPredicate = (flight: Flight, filter: string) => {
      const dataStr = flight.departure.airport.iata + flight.departure.airport.city + flight.departure.airport.name;
      return dataStr.toLowerCase().indexOf(filter) !== -1;
    };
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.airports$ = this.flightService.getAirports();
    this.dataSource = new MatTableDataSource();
  }

  search(): void {
    if (this.searchForm.valid) {
      this.flightService.searchFlights(this.searchForm.value).subscribe(data => this.dataSource.data = data);
    }
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
