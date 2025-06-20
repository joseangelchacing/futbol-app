import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiFootball {
  private baseUrl = 'https://v3.football.api-sports.io';
  private headers = new HttpHeaders({
    'x-apisports-key': '42ca56a8aaaf0bb91c876c94888cd706'
  });
  constructor(private http: HttpClient) { }
  league: string = '135';
  season: string = '2023';
  
  
  getLigasPorPais(pais: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/leagues?country=${encodeURIComponent(pais)}`, {
      headers: this.headers
    });
  }

  getPaisesConLigas(): Observable<any> {
    return this.http.get(`${this.baseUrl}/countries`, {
      headers: this.headers
    });
  }

  getEquiposPorLiga(leagueId: string, season: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/teams?league=${leagueId}&season=${season}`, {
      headers: this.headers
    });
  }

  getLigaPorId(leagueId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/leagues?id=${leagueId}`, {
      headers: this.headers
    });
  }
}
