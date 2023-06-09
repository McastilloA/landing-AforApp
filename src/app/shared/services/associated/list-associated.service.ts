import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { Associated } from '../../interfaces/associated';
import { RespServiceAssociated } from '../../interfaces/respService';


@Injectable({
  providedIn: 'root'
})
export class ListAssociatedService {

  /** Variabls globales */
  url = environment;

  constructor(private http: HttpClient) { }

  getAllAssociated(): Observable<RespServiceAssociated> {
    return this.http.get<RespServiceAssociated>(`${this.url.baseUrl}/${this.url.nameProject}/${this.url.controllerAssociated}/getAll.php`);
  }

  addAssociated(associated: Associated): Observable<RespServiceAssociated> {
    return this.http.post<RespServiceAssociated>(`${this.url.baseUrl}/${this.url.nameProject}/${this.url.controllerAssociated}/post.php`, associated);
  }

  updateAssociated(associated: Associated): Observable<RespServiceAssociated> {
    return this.http.put<RespServiceAssociated>(`${this.url.baseUrl}/${this.url.nameProject}/${this.url.controllerAssociated}/update.php`, associated);
  }

  deleteAssociated(associated: Associated): Observable<RespServiceAssociated> {
    return this.http.delete<RespServiceAssociated>(`${this.url.baseUrl}/${this.url.nameProject}/${this.url.controllerAssociated}/delete.php?idAssociated=${associated.id}`);
  }
}
