import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Capacity } from '../interfaces/capacity';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListCapacityService {

  /** Variabls globales */
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getCapacity(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getAll.php`);
  }

  addCapacity(capacity: Capacity): Observable<any> {
    return this.http.post(`${this.baseUrl}/post.php`, capacity);
  }

  updateCapacity(capacity: Capacity): Observable<any> {
    return this.http.put(`${this.baseUrl}/update.php`, capacity);
  }

  deleteCapacity(capacity: Capacity): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete.php?idcapacity=${capacity.id}`);
  }

}
