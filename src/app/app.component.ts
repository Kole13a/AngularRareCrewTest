import { Component, AfterViewInit, ViewChild, ViewContainerRef, Inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EmployeesTableComponent } from "./employees-table/employees-table.component";
import { PieChartLazyComponent } from './pie-chart/pie-chart-lazy.component';
import { isPlatformBrowser} from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, EmployeesTableComponent, CommonModule], // Uključi CommonModule
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('chartContainer', { read: ViewContainerRef }) chartContainer!: ViewContainerRef;
  public isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit() {
    if (this.isBrowser) {
      import('./pie-chart/pie-chart-lazy.component').then(({ PieChartLazyComponent }) => {
        const componentRef = this.chartContainer.createComponent(PieChartLazyComponent);
      });
    }
  }
}
