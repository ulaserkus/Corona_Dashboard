import { array, Label, number } from '@amcharts/amcharts4/core';
import { HttpClient } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { ChartType, ChartOptions, ChartPoint } from 'chart.js';
import { SingleDataSet, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, MultiDataSet, ThemeService } from 'ng2-charts';
import { Percantages } from '../models/Percantages';
import { PercantageService } from '../services/percantage.service';



@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css'],
})

export class PieChartComponent {

  Percantages: Percantages
  total: number = 0
  public pieChartOptions: ChartOptions = {
    responsive: false,

  };
  public pieChartLabels: String[] = []
  public pieChartData: Number[] = []
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public pieChartColors = [
    {
      backgroundColor: [
        'rgba(255,0,0,0.3)',
        'rgba(0,255,0,0.3)',
        'rgba(255,228,196,0.3)',
        'rgba(0,0,139,0.3)',
        'rgba(0,0,0,0.3)'
      ]
    }
  ]


  constructor(private percantageservice: PercantageService) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }



  ngOnInit(): void {
    this.percantageservice.getPercantages().subscribe(data => {

      this.pieChartData = data.percantageValues

      for (let index = 0; index < data.percantageValues.length; index++) {

        this.total = this.total + data.percantageValues[index].valueOf()
      }

      this.pieChartLabels = data.countryName

      if (this.total>0 &&this.total < 100) {
        this.pieChartData.push(100 - this.total);

        this.pieChartLabels.push("diğer")
      }


    
    })





  }



}