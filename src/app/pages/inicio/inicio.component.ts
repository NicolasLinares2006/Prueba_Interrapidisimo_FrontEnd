import { Component, inject } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import { Evento, Usuario } from '../../models/evento';
import { Router } from '@angular/router';
import { EventoService } from '../../services/evento.service';
import { UsuarioService } from '../../services/usuario.service';
import { InscrpcionService } from '../../services/inscripcion.service';
import { Inscripcion } from '../../models/inscrpcion';


@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [MatCardModule, MatTableModule, MatIconModule, MatButtonModule, MatSelectModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})

export class InicioComponent {
  private eventoService = inject(EventoService);
  private usuarioService = inject(UsuarioService);
  private inscripcionService = inject(InscrpcionService);
  
  public eventos:Evento[] = [];
  public usuarios:Usuario[] = [];

  public displayedColumns: string[] = ['id', 'nombre', 'descripcion', 'fechaHora', 'ubicacion', 'capacidadMaxima', 'asistentes', 'usuario','Accion'];
  usuarioSistema: number = 0;
  obetenerEventos(){
    this.eventoService.getEventos().subscribe({
      next:(data)=>{
        if(data.length > 0){
          this.eventos = data;
        }
      },
      error:(error)=>{
        console.log(error);
      }
    })
  }

  obetenerUsuarios(){
    this.usuarioService.getUsuarios().subscribe({
      next:(data)=>{
        if(data.length > 0){
          this.usuarios = data;
        }
      },
      error:(error)=>{
        console.log(error);
      }
    })
  }

  constructor(private router:Router){
    this.obetenerEventos();
    this.obetenerUsuarios();
  }

  redirigir(){
    this.router.navigate(['/evento', 0]);
  }

  editar(evento:Evento){
    this.router.navigate(['/evento', evento.id]);
  }

  eliminar(evento:Evento){
    if(confirm('¿Desea eliminar el evento?')){
      this.eventoService.deleteEvento(evento.id).subscribe({
        next:(data)=>{
          if(data){
            this.obetenerEventos();
          }
        },
        error:(error)=>{
          console.log(error);
        }
      })
    }else{
      alert('No se pudo eliminar el registro.')
    }
  }

  inscribirme(evento: Evento) {
    if (confirm('¿Desea inscribirse al evento?')) {
      const inscripcion: Inscripcion = {
        id: 0,
        eventoId: evento.id,
        usuarioId: this.usuarioSistema
      };
  
      this.inscripcionService.postInscrpcion(inscripcion).subscribe({
        next: (data) => {
          if (data) {
            this.obetenerEventos();
            alert('Inscrito correctamente.');
          }
        },
        error: (error) => {
          // Verificar si el error contiene mensajes y mostrarlos
          if (error.error && error.error.messages) {
            alert(error.error.messages.join('\n'));
          } else {
            console.error('Error desconocido:', error);
            alert('Ocurrió un error al intentar inscribirse.');
          }
        }
      });
    } else {
      alert('No se pudo inscribir.');
    }
  }
  

  onUsuarioChange(event: any): void {
    this.usuarioSistema = event.value; 
  }
}
