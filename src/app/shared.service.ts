import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


export interface Employee {
  EmployeeName:string;
  StarTimeUtc:string;
  EndTimeUtc:string;
}


@Injectable({
  providedIn: 'root'
})


export class SharedService {
  private header = new HttpHeaders({
    'Round1': 'vO17RnE8vuzXzPJo5eaLLjXjmRW07law99QTD90zat9FfOQJKKUcgQ=='
  })
  private apiUrl = 'https://rc-vault-fap-live-1.azurewebsites.net/api/gettimeentries?code=vO17RnE8vuzXzPJo5eaLLjXjmRW07law99QTD90zat9FfOQJKKUcgQ==';


  private data = new BehaviorSubject<any[]>([]);
  data$= this.data.asObservable();

  constructor(private http: HttpClient) {
    this.fetchData();
   }

   fetchData() {
    this.http.get<Employee[]>(this.apiUrl, { headers: this.header }).subscribe(response => {
      const transformedData = response.map(item => {
        const hours =(new Date(item.EndTimeUtc).getTime() - new Date(item.StarTimeUtc).getTime()) / (1000 * 60 * 60);
        return {
          name: item.EmployeeName ? item.EmployeeName : 'Unknown',
          hours: hours > 0 ? hours : 0
        };
      });
  

      const aggregatedData = transformedData
        .filter(item => item.hours > 0)
        .reduce((acc, item) => {
          if (!acc[item.name]) {
            acc[item.name] = 0;
          }
          acc[item.name] += item.hours;
          return acc;
        }, {} as Record<string, number>);
  

      const finalData = Object.entries(aggregatedData).map(([name, hours]) => ({
        name: name,
        hours:  Math.ceil(hours)
      }));
  
      this.data.next(finalData);
    });
  }
}

