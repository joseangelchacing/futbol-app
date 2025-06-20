import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ApiFootball } from '../services/api-football';

@Component({
  selector: 'app-equipos-liga',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './equipos-liga.html',
  styleUrls: ['./equipos-liga.css']
})
export class EquiposLiga implements OnInit {
  private apiService = inject(ApiFootball);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  equipos = signal<any[]>([]);
  seasons = signal<number[]>([]);
  selectedSeason = signal<string>('');
  leagueId = '';
  leagueName = '';

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.leagueId = params.get('leagueId') || '';
      const season = params.get('season') || '';
      this.selectedSeason.set(season);
      // Obtener info de la liga para seasons y nombre
      this.apiService.getLigaPorId(this.leagueId).subscribe((data: any) => {
        const liga = data.response[0];
        if (liga) {
          this.leagueName = liga.league.name;
          this.seasons.set(liga.seasons.map((s: any) => s.year).sort((a: number, b: number) => b - a));
        }
      });
      this.cargarEquipos(this.leagueId, season);
    });
  }

  onSeasonChange(event: Event) {
    const value = (event.target as HTMLSelectElement)?.value || '';
    this.selectedSeason.set(value);
    this.router.navigate(['/equipos', this.leagueId, value]);
  }

  cargarEquipos(leagueId: string, season: string) {
    this.apiService.getEquiposPorLiga(leagueId, season).subscribe((data: any) => {
      this.equipos.set(data.response);
    });
  }

  public volver() {
    this.router.navigate(['/']);
  }
} 