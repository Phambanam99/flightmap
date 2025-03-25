import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartData } from 'chart.js';

@Component({
  selector: 'app-statistics',
  standalone: false,
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit {

  // Dữ liệu biểu đồ Aircraft
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: string[] = ['BOEING 737', 'AIRBUS A320', 'EMBRAER 175', 'Others'];
  public pieChartData: ChartData<'pie'> = {
    labels: this.pieChartLabels,
    datasets: [
      {
        data: [28, 21, 9, 42], // Dữ liệu cho các phần của biểu đồ
        backgroundColor: ['#FF5733', '#33FF57', '#3357FF', '#FF33A1'], // Màu sắc cho từng phần trong pie chart
        hoverBackgroundColor: ['#FF5733', '#33FF57', '#3357FF', '#FF33A1'],
      }
    ]
  };
  public pieChartType: ChartType = 'pie';  // Dùng 'pie' để xác định loại biểu đồ

  // Dữ liệu biểu đồ Airline
  public airlineChartOptions: ChartOptions = {
    responsive: true,
  };
  public airlineChartLabels: string[] = ['Delta Air Lines', 'American Airlines', 'JetBlue Airways', 'Southwest Airlines'];
  public airlineChartData: ChartData<'pie'> = {
    labels: this.airlineChartLabels,
    datasets: [
      {
        data: [16, 15, 6, 13],  // Dữ liệu cho các phần của biểu đồ
        backgroundColor: ['#FF5733', '#33FF57', '#3357FF', '#FF33A1'], // Màu sắc cho từng phần
        hoverBackgroundColor: ['#FF5733', '#33FF57', '#3357FF', '#FF33A1'],
      }
    ]
  };
  public airlineChartType: ChartType = 'pie';  // Dùng 'pie'
selectedAircraft: any;
aircraftList: any;
selectedAirline: any;
airlineList: any;
selectedAirport: any;
airportList: any;
selectedRoute: any;
routeList: any;

  constructor() { }

  ngOnInit(): void { }

  applyFilters() {
    console.log('Applying filters');
    // Handle logic for applying filters
  }
}
