import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { SharedService } from '../shared.service';
import { ChartComponent, ApexNonAxisChartSeries, ApexChart, ApexResponsive, ApexLegend } from 'ng-apexcharts';
import { NgApexchartsModule } from 'ng-apexcharts';
import { CommonModule } from '@angular/common';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: string[];
  legend: ApexLegend;
};

@Component({
  selector: 'app-pie-chart-lazy',
  standalone: true,
  imports: [NgApexchartsModule, CommonModule],
  template: `
    <ng-container *ngIf="isBrowser">
      <ng-container *ngIf="chartOptions">
        <apx-chart
          [series]="chartOptions.series"
          [chart]="chartOptions.chart"
          [labels]="chartOptions.labels"
          [responsive]="chartOptions.responsive"
          [legend]="chartOptions.legend">
        </apx-chart>
      </ng-container>
    </ng-container>
  `,
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartLazyComponent implements OnInit {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions> | any = {};
  public isBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private sharedService: SharedService
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      this.sharedService.data$.subscribe(data => {
        this.chartOptions = {
          series: data.map(emp => emp.hours) || [],
          chart: {
            type: "pie",
            width: 500 
          },
          labels: data.map(emp => emp.name) || [],
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 400
              },
              legend: {
                position: 'bottom'
              }
            }
          }],
          legend: {
            position: 'right',
            offsetY: 0
          }
        };
      });
    }
  }
}
