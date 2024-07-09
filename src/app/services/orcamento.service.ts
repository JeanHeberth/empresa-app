import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Orcamento} from "../classes/orcamento";

@Injectable({
  providedIn: 'root'
})
export class OrcamentoService {

  constructor(private http: HttpClient ) { }


  listarOrcamentos(): Observable <Orcamento[]> {
    return this.http.get<Orcamento[]>('http://localhost:8088/api/orcamento')
  }

  buscarOrcamentoPorId(id: number): Observable<Orcamento> {
    return this.http.get<Orcamento>('http://localhost:8088/api/orcamento/' + id)

  }

  salvarOrcamento(orcamento: Orcamento): Observable<Orcamento> {
    return this.http.post<Orcamento>('http://localhost:8088/api/orcamento', orcamento)

  }

  atualizarOrcamento(orcamento: Orcamento): Observable<Orcamento> {
    return this.http.put<Orcamento>('http://localhost:8088/api/orcamento/' + orcamento.id, orcamento)

  }

  deletarOrcamento(orcamentoSelecionado: Orcamento): Observable<void> {
    return this.http.delete<void>('http://localhost:8088/api/orcamento/' + orcamentoSelecionado.id)

  }
}
