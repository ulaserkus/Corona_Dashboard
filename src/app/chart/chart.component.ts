import { Component, Inject, NgZone, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// amCharts imports
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { ChartService } from '../services/chart.service';
import { Chart } from '../models/Chart';
import { random } from '@amcharts/amcharts4/.internal/core/utils/String';


/* Chart code */
// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})

export class ChartComponent {
  private chart: am4charts.XYChart;

  constructor(@Inject(PLATFORM_ID) private platformId, private zone: NgZone,private ChartService:ChartService) { }

  // Run the function only in the browser
  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  ngAfterViewInit() {
    let chart = am4core.create("chartdiv", am4maps.MapChart);

    // Set map definition
    chart.geodata = am4geodata_worldLow;

    // Set projection
    chart.projection = new am4maps.projections.Miller();

    // Create map polygon series
    let polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

    // Exclude Antartica
    polygonSeries.exclude = ["AQ"];

    // Make map load polygon (like country names) data from GeoJSON
    polygonSeries.useGeodata = true;

    // Configure series
    let polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.tooltipText = "{name}";
    polygonTemplate.polygon.fillOpacity = 0.6;


    // Create hover state and set alternative fill color
    let hs = polygonTemplate.states.create("hover");
    hs.properties.fill = chart.colors.getIndex(0);

    // Add image series
    let imageSeries = chart.series.push(new am4maps.MapImageSeries());
    imageSeries.mapImages.template.propertyFields.longitude = "longitude";
    imageSeries.mapImages.template.propertyFields.latitude = "latitude";
    imageSeries.mapImages.template.tooltipText = "Vaka: {patient}";


    let circle = imageSeries.mapImages.template.createChild(am4core.Circle);
    circle.radius = 2;
    circle.propertyFields.fill = "color";
    

    let circle2 = imageSeries.mapImages.template.createChild(am4core.Circle);
    circle2.radius = 1;
    circle2.propertyFields.fill = "color";


    circle2.events.on("inited", function (event) {
       animateBullet(event.target);
    })


    function animateBullet(circle) {
      let animation = circle.animate([{ property: "scale", from: 1, to: 5 }, { property: "opacity", from: 1, to: 0 }], 1000, am4core.ease.circleOut);
      animation.events.on("animationended", function (event) {
        animateBullet(event.target.object);
      })
    }

 
   this.ChartService.getCities().subscribe(dt =>{
     imageSeries.data=dt
  
   })   
        // imageSeries.data=[{
        //   "patient":200,
        //   "latitude": 47,
        //   "longitude": -107,
        //   "color":"red",
        //   "radius":8
        // },{
        //   "patient":200,
        //   "latitude": 36,
        //   "longitude": 25,
        //   "color":"red",
        //   "radius":4
        // }
        // ]

  }


  ngOnInit(): void {
     
   
      
  }
}
