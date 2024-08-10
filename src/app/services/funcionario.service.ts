import {Injectable} from '@angular/core';
import {Funcionario} from "../classes/funcionario";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  private apiUrl = 'http://localhost:8088/api/funcionario'

  constructor(private http: HttpClient) {
  }


  salvarFuncionario(funcionario: Funcionario): Observable<Funcionario> {
    // @ts-ignore
    return this.http.post(`${this.apiUrl}`, funcionario);
  }

  listarFuncionarios(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(`${this.apiUrl}`);
  }

  buscarFuncionarioPorId(id: number): Observable<Funcionario> {
    return this.http.get<Funcionario>(`${this.apiUrl}/` + id);
  }


  deletarFuncionario(funcionarioSelecionado: Funcionario): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/` + funcionarioSelecionado.id);
  }

  atualizarFuncionario(funcionario: Funcionario): Observable<Funcionario> {
    // @ts-ignore
    return this.http.put(`${this.apiUrl}/` + funcionario.id, funcionario);

  }


  buscarNomePorCpf(cpf: string): Observable<Funcionario> {
    return this.http.get<any>(`${this.apiUrl}/cpf/` + cpf);
  }

  generateMatricula(dataAdmissao: string, cpf: string): Observable<Funcionario> {
    const params = new HttpParams()
      .set('dataAdmissao', dataAdmissao)
      .set('cpf', cpf);
    // @ts-ignore
    return this.http.get<{ matricula: string }>(`${this.apiUrl}/generate/matricula`, { params });}

  buscarMatriculaSupervisor(matriculaSupervisor: string): Observable<Funcionario> {
    return this.http.get<any>(`${this.apiUrl}/matricula/` + matriculaSupervisor);

  }
}
