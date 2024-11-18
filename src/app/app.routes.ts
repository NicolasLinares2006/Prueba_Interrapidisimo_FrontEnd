import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { EventoComponent } from './pages/evento/evento.component';

export const routes: Routes = [
    {path:'', component:InicioComponent},
    {path:'inicio', component:InicioComponent},
    {path:'evento/:id', component:EventoComponent}
];
