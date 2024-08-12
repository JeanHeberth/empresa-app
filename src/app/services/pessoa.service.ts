import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Pessoa} from "../classes/pessoa";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  constructor(private http: HttpClient ) { }



  salvarPessoa(pessoa: Pessoa): Observable<Pessoa> {
    return this.http.post<Pessoa>('http://localhost:8088/api/pessoa', pessoa)
  }


  listarPessoas(): Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>('http://localhost:8088/api/pessoa')

  }

  deletarPessoa(pessoaSelecionadad: Pessoa): Observable<Pessoa> {
    return this.http.delete<Pessoa>(`http://localhost:8088/api/pessoa/${pessoaSelecionadad.id}`)

  }
}
