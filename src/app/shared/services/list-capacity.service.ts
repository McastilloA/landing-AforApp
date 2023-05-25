import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Capacity } from '../interfaces/capacity';
import { Observable } from 'rxjs';
import { RespService } from '../interfaces/respService';

@Injectable({
  providedIn: 'root'
})
export class ListCapacityService {

  /** Variabls globales */
  url = environment;

  constructor(private http: HttpClient) { }

  getAllCapacity(): Observable<RespService> {
    return this.http.get<RespService>(`${this.url.baseUrl}/${this.url.nameProject}/${this.url.controller}/getAll.php`);
  }

  addCapacity(capacity: Capacity): Observable<RespService> {
    return this.http.post<RespService>(`${this.url.baseUrl}/${this.url.nameProject}/${this.url.controller}/post.php`, capacity);
  }

  updateCapacity(capacity: Capacity): Observable<RespService> {
    return this.http.put<RespService>(`${this.url.baseUrl}/${this.url.nameProject}/${this.url.controller}/update.php`, capacity);
  }

  deleteCapacity(capacity: Capacity): Observable<RespService> {
    return this.http.delete<RespService>(`${this.url.baseUrl}/${this.url.nameProject}/${this.url.controller}/delete.php?idCapacity=${capacity.id}`);
  }

}
