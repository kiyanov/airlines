
export interface Coords {
  lat: number;
  lng: number;
}
export interface Airport {
  iata: string;
  name: string;
  city: string;
  coords?: Coords
}

export interface Departure {
  airport: Airport;
  datetime: Date
}

export interface Arrival {
  airport: Airport;
  datetime: Date,
}

export interface Aircraft {
  _id: string;
  model: string;
}

export interface Flight {
  _id: string;
  duration: number;
  departure: Departure;
  arrival: Arrival;
  aircraft: Aircraft;
  price: number;
}

export interface Trip {
  _id: string;
  flights: Flight[];
}

export interface SearchOptions {
  arrival: string;
  dateFrom: Date;
  dateTo: Date;
  departure: string;
  priceFrom: number;
  priceTo: number;
}
