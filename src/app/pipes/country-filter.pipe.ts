import { Pipe, PipeTransform } from '@angular/core';
import { Table } from '../models/Table';

@Pipe({
  name: 'countryFilter'
})
export class CountryFilterPipe implements PipeTransform {

  transform(countries: Table[], searchTerm: string): any {
    if (!countries || !searchTerm) {
      return countries
    }


    return countries.filter(countries => countries.countryName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1)
  }

}
