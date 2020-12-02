import { Pipe, PipeTransform } from '@angular/core';
import {Airport} from "./models/models";

@Pipe({
  name: 'removeSelectedAirport'
})
export class RemoveSelectedAirportPipe implements PipeTransform {

  transform(airports: Airport[], ...args: string[]):  Airport[] {
    return airports.filter((airport) => airport.iata !== args[0]);
  }

}
