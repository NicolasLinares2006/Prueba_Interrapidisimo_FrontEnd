import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { appsettings } from '../settings/appsettings';
import { Evento, Usuario } from '../models/evento';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private http = inject(HttpClient);
  private apiUrl:string = appsettings.apiUrl + "Usuario";
  constructor() { }

  getUsuarios(){
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  getUsuario(id:number){
    return this.http.get<Usuario>(`${this.apiUrl}/${id}`);
  }
}
