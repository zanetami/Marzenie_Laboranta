import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import type { Device } from '../models/device';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  private mainUrl = 'http://localhost:3000/devices/'

  constructor(private http: HttpClient) { }

  getAllConnectedDevices(id): Observable<any> {
    return this.http.get(`getallconnecteddevices/${id}`);
  }

  addDevice(newDevice: Device): Observable<any> {
    return this.http.post(`adddevice`, newDevice);
  }
}
