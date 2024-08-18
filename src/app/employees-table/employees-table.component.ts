import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-employees-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employees-table.component.html',
  styleUrl: './employees-table.component.css'
})
export class EmployeesTableComponent implements OnInit {

  employees:any;

  constructor(private sharedService:SharedService){}

  ngOnInit() {
    this.sharedService.fetchData();
    this.sharedService.data$.subscribe(data => {
      this.employees=data;
    });}
}
