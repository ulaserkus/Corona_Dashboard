import { array } from '@amcharts/amcharts4/core';
import { Component, } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { Line } from '../models/Line';
import { LineService } from '../services/line.service';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})

export class LineChartComponent {


  linedata: Line
  

  
  lineChartData: ChartDataSets[] = [
    { data: [], label: 'Vaka' },
    { data: [], label: 'Ölüm' },
    { data: [], label: 'İyileşme' }

  ];

  lineChartLabels: Label[] = []

  lineChartOptions = {
    responsive: true,
  };

  lineChartColors: Color[] = [

    { //red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    {
      backgroundColor: 'rgba(102,205,170,0.2)',
      borderColor: 'rgba(102,205,170,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';


  constructor(private LineService: LineService, private activatedRoute: ActivatedRoute) {

  }




  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params => {

      if (params["countryName"]) {
        
        this.getValuesByCountry(params["countryName"])
      } else {
        this.getValuesByWorld()
      }

    })

    
  }

  getValuesByWorld() {
    this.LineService.getValuesByDate().subscribe(data => {

      this.lineChartLabels = data.dates
      this.lineChartData[0].data = data.totalPatientsByDate
      this.lineChartData[1].data = data.totalDeathsByDate
      this.lineChartData[2].data = data.totalCuresByDate
    })


  }

  getValuesByCountry(countryName) {
    this.LineService.getValuesByCountry(countryName).subscribe(dt => {
      this.lineChartLabels = dt.dates
      this.lineChartData[0].data = dt.totalPatientsByDate
      this.lineChartData[1].data = dt.totalDeathsByDate
      this.lineChartData[2].data = dt.totalCuresByDate

    })
  }
}