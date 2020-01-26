import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Issue } from '../models/issue';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class IssueService {

  private mainUrl = 'http://192.168.43.175:3000/issues/'

  constructor(private http: HttpClient) { }

  getAllIssuesByUser(user: User): Observable<any> {
    return this.http.post(this.mainUrl + `getallissuesbyuser`, user);
  }

  addIssue(tab, initiator_id): Observable<any> {
    return this.http.post(this.mainUrl + `addissue/${initiator_id}`, tab);
  }

  getIssueByDate(date): Observable<any> {
    return this.http.post(this.mainUrl + `getissuebydate`, date);
  }

  setIssueSolver(id_i, solver_id): Observable<any> {
    return this.http.get(this.mainUrl + `setissuesolver/${id_i}/${solver_id}`);
  }

  updateIssue(newIssue: Issue): Observable<any> {
    return this.http.post(this.mainUrl + `updateissue`, newIssue);
  }

  deleteIssue(id): Observable<any> {
    return this.http.delete(this.mainUrl + `deleteissue/${id}`);
  }
}
