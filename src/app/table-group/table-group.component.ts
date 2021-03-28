import { SortedList } from '@amcharts/amcharts4/core';
import { Component, OnInit } from '@angular/core';
import { Table } from '../models/Table';
import { TableService } from '../services/table.service';

@Component({
  selector: 'app-table-group',
  templateUrl: './table-group.component.html',
  styleUrls: ['./table-group.component.css']
})
export class TableGroupComponent implements OnInit {

  constructor(private TableService: TableService) { }

  countries: Table[]
  searchTerm: string

  ngOnInit(): void {
    this.TableService.getCountries().subscribe(data => {

      this.countries = data
    })
  }
  sort(sortCategory) {

   

    switch (sortCategory) {
      case "1":
        this.TableService.getCountriesOrderByName().subscribe(data => {

          this.countries = data
        })
       
        break

      case "2":
        this.TableService.getCountriesOrderByPatient().subscribe(data => {

          this.countries = data
        })
       
        
        break

      case "3":
        this.TableService.getCountriesOrderByDeath().subscribe(data => {

          this.countries = data
        })
       
        break

      case "4":
        this.TableService.getCountriesOrderByCure().subscribe(data => {

          this.countries = data
        })
       

        break

    }
  }

}
