import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private mainUrl = 'http://192.168.43.175:3000/users/'

  constructor(private http: HttpClient) { }

  loginUser(login: String, password: String): Observable<any> {
    return this.http.get(this.mainUrl + `loginuser/${login}/${password}`);
  }

  getUserById(id: number): Observable<any> {
    return this.http.get(this.mainUrl + `getuserbyid/${id}`);
  }

  registerUser(newUser: User): Observable<any> {
    return this.http.post(this.mainUrl + `registeruser`, newUser);
  }

  getAllUsers(): Observable<any> {
    return this.http.get(this.mainUrl + `getallusers`);
  }

  deleteUser(id: Number): Observable<any> {
    return this.http.delete(this.mainUrl + `deleteUser/${id}`);
  }

  updateUser(newUser: User, id: number): Observable<any> {
    return this.http.put(this.mainUrl + `updateuser/${id}`, newUser);
  }

}
