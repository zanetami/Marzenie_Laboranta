import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Issue } from '../models/issue';

@Injectable({
  providedIn: 'root'
})
export class IssueService {

  private mainUrl = 'http://localhost:3000/issues/'

  constructor(private http: HttpClient) { }

  getAllIssues(): Observable<any> {
    return this.http.get(`getallissues`);
  }

  addIssues(description): Observable<any> {
    return this.http.get(`addissue/${description}`);
  }

  setIssueSolver(id_i, solver_id): Observable<any> {
    return this.http.get(`setissuesolver/${id_i}/${solver_id}`);
  }

  updateIssue(newIssue: Issue): Observable<any> {
    return this.http.put(`updateissue`, newIssue);
  }

  deleteIssue(id): Observable<any> {
    return this.http.delete(`deleteissue/${id}`);
  }
}
