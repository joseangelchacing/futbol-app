import { Routes } from '@angular/router';
import { SelectorLigas } from './selector-ligas/selector-ligas';
// Importar el nuevo componente EquiposLiga
import { EquiposLiga } from './equipos-liga/equipos-liga';

export const routes: Routes = [
  { path: '', component: SelectorLigas },
  { path: 'equipos/:leagueId/:season', component: EquiposLiga },
];
