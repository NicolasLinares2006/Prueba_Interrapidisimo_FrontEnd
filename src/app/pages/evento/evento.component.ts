import { Component, inject, Input, OnInit } from '@angular/core';
import { Evento } from '../../models/evento';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder,FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { EventoService } from '../../services/evento.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-evento',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './evento.component.html',
  styleUrl: './evento.component.css'
})
export class EventoComponent implements OnInit {
  @Input('id')idEvento! : number;
  mostrarCampo: boolean = false;
  private eventoServicio = inject(EventoService);
  public formBuild = inject(FormBuilder);

  public formEvento: FormGroup = this.formBuild.group({
    id: [null, [Validators.required]], // Campo obligatorio
    nombre: [null, [Validators.required, Validators.maxLength(100)]], // Máximo 100 caracteres
    descripcion: [null, [Validators.maxLength(255)]], // Máximo 255 caracteres opcional
    fechaHora: [null, [Validators.required]], // Campo obligatorio
    ubicacion: [null, [Validators.maxLength(150)]], // Máximo 150 caracteres opcional
    capacidadMaxima: [null, [Validators.required, Validators.min(0)]], // Campo obligatorio, mínimo 1
    usuarioId: [null, [Validators.required]] // Campo obligatorio
  });

  constructor(private router:Router){}

  ngOnInit(): void {
    this.obtenerEventos();
  }

  obtenerEventos(){
    if(this.idEvento != 0){
      this.mostrarCampo = true;
      this.eventoServicio.getEvento(this.idEvento).subscribe({
        next:(data) =>{
          this.formEvento.patchValue({
              id: data.id || null,
              nombre: data.nombre || null,
              descripcion: data.descripcion || null,
              fechaHora: data.fechaHora || null,
              ubicacion: data.ubicacion || null,
              capacidadMaxima: data.capacidadMaxima || null,
              usuarioId: data.usuario?.id || null
          });
        },
        error:(error)=>{
          console.log(error);
        }
      })
    }
  }

  guardarEvento(){
    const evento: Evento = {
      id: this.idEvento, 
      nombre: this.formEvento.get('nombre')?.value || '',
      descripcion: this.formEvento.get('descripcion')?.value || '',
      fechaHora: this.formEvento.get('fechaHora')?.value || new Date(), 
      ubicacion: this.formEvento.get('ubicacion')?.value || '',
      capacidadMaxima: this.formEvento.get('capacidadMaxima')?.value || 0,
      usuario: {
          id: this.formEvento.get('usuarioId')?.value || 0
      }
    };

    if(this.idEvento == 0){
      this.eventoServicio.postEvento(evento).subscribe({
        next:(data) =>{
          if(data){
            this.router.navigate(["/"]);
          }else{
            alert("Error al crear registro.")
          }
        },
        error:(error)=>{
          console.log(error);
        }
      })
    }else{
      this.eventoServicio.putEvento(evento).subscribe({
        next:(data) =>{
          if(data){
            this.router.navigate(["/"]);
          }else{
            alert("Error al editar registro.")
          }
        },
        error:(error)=>{
          console.log(error);
        }
      })
    }
  }

  volver(){
    this.router.navigate(["/"]);
  }
}
