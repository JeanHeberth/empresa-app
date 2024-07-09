import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Projeto} from "../classes/projeto";

@Injectable({
  providedIn: 'root'
})
export class ProjetoService {

  constructor(private http: HttpClient ) { }

  salvarProjeto(projeto: Projeto): Observable<Projeto> {
    return this.http.post<Projeto>('http://localhost:8088/api/projeto', projeto)
  }

  listarProjetos(): Observable <Projeto[]> {
    return this.http.get<Projeto[]>('http://localhost:8088/api/projeto')
  }

  buscarProjetoPorId(id: number): Observable<Projeto> {
    return this.http.get<Projeto>('http://localhost:8088/api/projeto/' + id)
  }

  atualizarProjeto(projeto: Projeto): Observable<Projeto> {
    return this.http.put<Projeto>('http://localhost:8088/api/projeto/' + projeto.id, projeto)
  }

  deletarProjeto(projetoSelecionado: Projeto): Observable<Projeto> {
    return this.http.delete<Projeto>('http://localhost:8088/api/projeto/' + projetoSelecionado.id)

  }
}
