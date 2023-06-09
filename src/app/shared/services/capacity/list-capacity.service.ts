import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { RespService } from '../../interfaces/respService';
import { Capacity } from '../../interfaces/capacity';

@Injectable({
  providedIn: 'root'
})
export class ListCapacityService {

  /** Variabls globales */
  url = environment;

  constructor(private http: HttpClient) { }

  getAllCapacity(): Observable<RespService> {
    return this.http.get<RespService>(`${this.url.baseUrl}/${this.url.nameProject}/${this.url.controllerCapacity}/getAll.php`);
  }

  addCapacity(capacity: Capacity): Observable<RespService> {
    return this.http.post<RespService>(`${this.url.baseUrl}/${this.url.nameProject}/${this.url.controllerCapacity}/post.php`, capacity);
  }

  updateCapacity(capacity: Capacity): Observable<RespService> {
    return this.http.put<RespService>(`${this.url.baseUrl}/${this.url.nameProject}/${this.url.controllerCapacity}/update.php`, capacity);
  }

  deleteCapacity(capacity: Capacity): Observable<RespService> {
    return this.http.delete<RespService>(`${this.url.baseUrl}/${this.url.nameProject}/${this.url.controllerCapacity}/delete.php?idCapacity=${capacity.id}`);
  }

}
