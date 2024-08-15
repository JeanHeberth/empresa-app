import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Projeto} from "../classes/projeto";

@Injectable({
  providedIn: 'root'
})
export class ProjetoService {

  private apiUrl = 'http://10.10.0.211:8088/api/projeto'

  constructor(private http: HttpClient ) { }

  salvarProjeto(projeto: Projeto): Observable<Projeto> {
    return this.http.post<Projeto>(`${this.apiUrl}`, projeto)
  }

  listarProjetos(): Observable <Projeto[]> {
    return this.http.get<Projeto[]>(`${this.apiUrl}`)
  }

  buscarProjetoPorId(id: number): Observable<Projeto> {
    return this.http.get<Projeto>(`${this.apiUrl}` + id)
  }

  atualizarProjeto(projeto: Projeto): Observable<Projeto> {
    return this.http.put<Projeto>(`${this.apiUrl}` + projeto.id, projeto)
  }

  deletarProjeto(projetoSelecionado: Projeto): Observable<Projeto> {
    return this.http.delete<Projeto>(`${this.apiUrl}` + projetoSelecionado.id)

  }
}
