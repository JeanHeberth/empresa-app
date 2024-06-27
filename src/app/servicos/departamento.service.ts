import {Injectable} from '@angular/core';
import {Departamento} from "../classes/departamento";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  constructor(departamento: Departamento, private http: HttpClient) {
  }

  salvarDepartamento(departamento: Departamento): Observable<Departamento> {
    // @ts-ignore
    return this.http.post("http://localhost:8088/api/departamento", departamento);
  }

  atualizarDepartamento(departamento: Departamento): Observable<any> {
    // @ts-ignore
    return this.http.put("http://localhost:8088/api/departamento/" + departamento.id, departamento);
  }

  buscarDepartamentos(): Observable<Departamento[]> {
    return this.http.get<Departamento[]>("http://localhost:8088/api/departamento");
  }

  buscarDepartamentoPorId(id: number): Observable<Departamento> {
    return this.http.get<Departamento>("http://localhost:8088/api/departamento/" + id);
  }

  deletarDepartamento(departamento: Departamento) : Observable<any> {
    return this.http.delete<any>("http://localhost:8088/api/departamento/" + departamento.id);

  }

}
