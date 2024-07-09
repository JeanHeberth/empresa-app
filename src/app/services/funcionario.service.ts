import {Injectable} from '@angular/core';
import {Funcionario} from "../classes/funcionario";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  constructor(private http: HttpClient) {
  }


  salvarFuncionario(funcionario: Funcionario): Observable<Funcionario> {
    // @ts-ignore
    return this.http.post('http://localhost:8088/api/funcionario', funcionario);
  }

  listarFuncionarios(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>('http://localhost:8088/api/funcionario');
  }

  buscarFuncionarioPorId(id: number): Observable<Funcionario> {
    return this.http.get<Funcionario>('http://localhost:8088/api/funcionario/' + id);
  }


  deletarFuncionario(funcionarioSelecionado: Funcionario): Observable<any> {
    return this.http.delete<any>('http://localhost:8088/api/funcionario/' + funcionarioSelecionado.id);
  }

  atualizarFuncionario(funcionario: Funcionario): Observable<Funcionario> {
    // @ts-ignore
    return this.http.put('http://localhost:8088/api/funcionario/' + funcionario.id, funcionario);

  }
}
