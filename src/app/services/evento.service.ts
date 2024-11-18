import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { appsettings } from '../settings/appsettings';
import { Evento } from '../models/evento';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  private http = inject(HttpClient);
  private apiUrl:string = appsettings.apiUrl + "Evento";
  constructor() { }

  getEventos(){
    return this.http.get<Evento[]>(this.apiUrl);
  }

  getEvento(id:number){
    return this.http.get<Evento>(`${this.apiUrl}/${id}`);
  }

  postEvento(evento:Evento){
    return this.http.post<Response>(this.apiUrl, evento);
  }

  putEvento(evento:Evento){
    return this.http.put<Response>(this.apiUrl, evento);
  }

  deleteEvento(id:number){
    return this.http.delete<Evento>(`${this.apiUrl}/${id}`);
  }
}
