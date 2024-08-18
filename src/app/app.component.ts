import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EmployeesTableComponent } from "./employees-table/employees-table.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, EmployeesTableComponent,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'RareApp';
}
