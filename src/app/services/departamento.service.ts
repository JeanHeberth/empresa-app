import {Injectable} from '@angular/core';
import {Departamento} from "../classes/departamento";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  private apiUrl = 'http://localhost:8088/api/departamento'


  constructor(departamento: Departamento, private http: HttpClient) {
  }

  salvarDepartamento(departamento: Departamento): Observable<Departamento> {
    // @ts-ignore
    return this.http.post(`${this.apiUrl}`, departamento);
  }

  atualizarDepartamento(departamento: Departamento): Observable<any> {
    // @ts-ignore
    return this.http.put(`${this.apiUrl}` + departamento.id, departamento);
  }

  buscarDepartamentos(): Observable<Departamento[]> {
    return this.http.get<Departamento[]>(`${this.apiUrl}`);
  }

  buscarDepartamentoPorId(id: number): Observable<Departamento> {
    return this.http.get<Departamento>(`${this.apiUrl}` + id);
  }

  deletarDepartamento(departamento: Departamento) : Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/` + departamento.id);

  }

}
