import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Pessoa} from "../classes/pessoa";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  private apiUrl = 'http://10.10.0.211:8088/api/pessoa'


  constructor(private http: HttpClient ) { }



  salvarPessoa(pessoa: Pessoa): Observable<Pessoa> {
    return this.http.post<Pessoa>(`${this.apiUrl}`, pessoa)
  }


  listarPessoas(): Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>(`${this.apiUrl}`)

  }

  deletarPessoa(pessoaSelecionadad: Pessoa): Observable<Pessoa> {
    return this.http.delete<Pessoa>(`${this.apiUrl}` +pessoaSelecionadad.id)

  }
}
