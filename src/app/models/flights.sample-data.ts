import {Aircraft, Airport, Flight} from "./models";
// Sample aircraft types
enum AircraftTypes {
  'Boeing 737',
  'Boeing 787',
  'Boeing 737 Max',
  'Boeing 777',
  'Airbus A318',
  'Airbus A380',
  'Airbus A350',
  'Airbus A220'
}

// Sample airports
export const airports: Airport[] = [{
  city: 'Kyiv',
  name: 'Boryspil International Airport',
  iata: 'KBP',
},{
  city: 'Cherkasy',
  name: 'Cherkasy International Airport',
  iata: 'CKC',
},{
  city: 'Chernivtsi',
  name: 'Chernivtsi International Airport',
  iata: 'CWC',
},{
  city: 'Dnipro',
  name: 'Dnipropetrovsk International Airport',
  iata: 'DNK',
},{
  city: 'Ivano-Frankivsk',
  name: 'Ivano-Frankivsk International Airport',
  iata: 'IFO',
},{
  city: 'Kharkiv',
  name: 'Kharkiv International Airport',
  iata: 'HRK',
},{
  city: 'Kherson',
  name: 'Kherson International Airport',
  iata: 'KHE',
}];


/*
  Generates list of random flights
 */
export function generateFlights (count): Flight[] {
  return Array.from({length: count}, () => getFlight());
}

/*
  Function is needed to generate random Flight
 */
function getFlight(): Flight {
  // generate random date from date range
  const departure = randomDate(new Date(2020, 9, 16), new Date(2020, 11, 25));
  // generate random flight duration to make arrival to be a bit later
  const duration = Math.floor(Math.random() * 12) + 1;

  return {
    _id: getId(),
    aircraft: getAircraft(),
    duration: duration,
    departure: {
      airport: getAirport(),
      datetime: departure
    },
    arrival: {
      airport: getAirport(),
      datetime: new Date(departure.setHours(departure.getHours() + duration)),
    },
    price: Math.floor(10 + Math.random()*(100 + 1 - 10))
  }
}

// Helper functions
function getAirport() {
  return airports[Math.floor(Math.random() * airports.length)];
}

function getId() {
  return '_' + Math.random().toString(36).substr(2, 10);
}

function getAircraft(): Aircraft {
  const len = (Object.keys(AircraftTypes).length / 2) - 1;
  const index = (Math.floor(Math.random() * len));
  return {
    _id: Math.random().toString(36),
    model: AircraftTypes[index],
  };
}

function randomDate(start, end): Date {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}


