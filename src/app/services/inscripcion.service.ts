import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { appsettings } from '../settings/appsettings';
import { Inscripcion } from '../models/inscrpcion';

@Injectable({
  providedIn: 'root'
})
export class InscrpcionService {

  private http = inject(HttpClient);
  private apiUrl:string = appsettings.apiUrl + "Inscripcion";
  constructor() { }

  postInscrpcion(inscrpcion:Inscripcion){
    return this.http.post<Response>(this.apiUrl, inscrpcion);
  }
}
