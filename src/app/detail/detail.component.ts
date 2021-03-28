import { number, object, string } from '@amcharts/amcharts4/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IMyDateModel, IMyDpOptions } from 'mydatepicker';
import { CountryDetail } from '../models/CountryDetail';
import { Detail } from '../models/detail';
import { TableService } from '../services/table.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  addDetailsForm: FormGroup

  constructor(private tableService: TableService, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, private router: Router) {
        
    this.addDetailsForm = formBuilder.group({
      patient: ['', Validators.required],
      death: ['', Validators.required],
      addedTime: ['', Validators.required],
      cure: ['', Validators.required],
      countryId: this.countryId
    })

  }


  detail: CountryDetail

  dates: string[]


  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'dd.mm.yyyy',
  };


  details: Detail[]

  countryId: number

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params => {

      this.GetCountryByName(params["countryName"])
      this.GetCountryId(params["countryName"])

    })

  }

  GetCountryByName(countryName) {
    this.tableService.getCountriesByName(countryName).subscribe(dt => {
      this.details = dt

      this.details.forEach(x => { x.addedTime = x.addedTime.slice(0, 10) })


    })

  }

  GetCountryId(countryName) {
    this.tableService.getCountryId(countryName).subscribe(dt => {
      this.countryId = dt
      console.log(this.countryId)

    })
  }
  

  postData() {
   
    let dateString :string=this.addDetailsForm.value.addedTime.date.day +"-"+ this.addDetailsForm.value.addedTime.date.month +"-"+ this.addDetailsForm.value.addedTime.date.year
   
    var mydate = new Date(parseInt(this.addDetailsForm.value.addedTime.date.year,10),parseInt(this.addDetailsForm.value.addedTime.date.month, 10) - 1,parseInt(this.addDetailsForm.value.addedTime.date.day, 10)+1)
    this.detail = {

      "patient": this.addDetailsForm.value.patient,
      "death": this.addDetailsForm.value.death,
      "cure": this.addDetailsForm.value.cure,
      "addedTime":mydate,
      "countryId": this.countryId,
      
    }
    console.log(dateString)

    this.tableService.addDetail(this.detail).subscribe(response => {

      this.router.navigateByUrl("/admin")
    
    }, err => {
      if (err) {

        console.log(err.message)
        console.log(this.detail)

      }
    })

  }
  logOut() {
    localStorage.removeItem("jwt")
    this.router.navigateByUrl("/")
  }
  admin() {
    this.router.navigateByUrl("/admin")
  }
}
