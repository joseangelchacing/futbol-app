import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiFootball } from '../services/api-football';
import { Router } from '@angular/router';

@Component({
  selector: 'app-selector-ligas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './selector-ligas.html',
  styleUrls: ['./selector-ligas.css']
})
export class SelectorLigas implements OnInit {
  private apiService = inject(ApiFootball);
  private router = inject(Router);
  paises = signal<any[]>([]);
  ligas = signal<any[]>([]);
  paisSeleccionado = signal<string | null>(null);

  ngOnInit() {
    console.log('SelectorLigas: ngOnInit se está ejecutando.');
    this.apiService.getPaisesConLigas().subscribe({
      next: (data: any) => {
        console.log('Respuesta de la API de países:', data);
        this.paises.set(data.response);
      },
      error: (err) => {
        console.error('Error al obtener los países:', err);
      }
    });
  }

  onPaisChange(event: Event) {
    const value = (event.target as HTMLSelectElement)?.value || '';
    this.paisSeleccionado.set(value);
    this.apiService.getLigasPorPais(value).subscribe((data: any) => {
      this.ligas.set(data.response);
    });
  }

  irAEquiposLiga(liga: any) {
    const seasons = liga.seasons.map((s: any) => s.year);
    const mostRecent = Math.max(...seasons);
    this.router.navigate(['/equipos', liga.league.id, mostRecent]);
  }
} 