import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  private mainUrl = 'http://192.168.43.175:3000/statistics'

  constructor(private http: HttpClient) { }

  getStatsUser(id): Observable<any> {
    return this.http.get(this.mainUrl + `/user/${id}`);
  }

  getStatsService(id): Observable<any> {
    return this.http.get(this.mainUrl + `/service/${id}`);
  }

  getStats(): Observable<any> {
    return this.http.get(this.mainUrl);
  }

}
