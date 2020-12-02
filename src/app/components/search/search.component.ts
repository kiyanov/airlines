import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FlightService} from '../../services/flight.service';
import {fromEvent, Observable,} from 'rxjs';
import {Airport, Flight} from '../../models/models';
import {FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {debounceTime, distinctUntilChanged, map} from "rxjs/operators";

const identityRevealedValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const arrival: string = control.get('arrival')?.value;
  const departure: string = control.get('departure')?.value;
  return arrival === departure && departure !== '' ? {sameStation: true} : null;
};

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
    priceFrom: new FormControl(null, [Validators.minLength(1), Validators.maxLength(10000)]),
    priceTo: new FormControl(null, [Validators.minLength(1), Validators.maxLength(10000)]),
    directFlight: new FormControl(true, []),
    connections: new FormControl(1, [Validators.minLength(1)]),
  }, {validators: [identityRevealedValidator]});
  dataSource: MatTableDataSource<Flight>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('searchInput') searchInput: ElementRef;

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

    fromEvent(this.searchInput.nativeElement, 'keyup').pipe(
      map((v: { target: HTMLInputElement }) => v.target.value.trim()),
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe((v) => {
      console.log(v)
      this.dataSource.filter = v;
      this.dataSource.paginator?.firstPage();
    }, (err) => {
      console.error(err);
    });
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

}
