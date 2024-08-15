import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Orcamento} from "../classes/orcamento";

@Injectable({
  providedIn: 'root'
})
export class OrcamentoService {


  private baseUrl = 'http://10.10.0.211:8088/api/orcamento';


  constructor(private http: HttpClient ) { }


  listarOrcamentos(): Observable <Orcamento[]> {
    return this.http.get<Orcamento[]>(this.baseUrl)
  }

  buscarOrcamentoPorId(id: number): Observable<Orcamento> {
    return this.http.get<Orcamento>(this.baseUrl + id)

  }

  salvarOrcamento(orcamento: Orcamento): Observable<Orcamento> {
    return this.http.post<Orcamento>(this.baseUrl, orcamento)

  }

  atualizarOrcamento(orcamento: Orcamento): Observable<Orcamento> {
    return this.http.put<Orcamento>(this.baseUrl + orcamento.id, orcamento)

  }

  deletarOrcamento(orcamentoSelecionado: Orcamento): Observable<void> {
    return this.http.delete<void>('http://localhost:8088/api/orcamento/' + orcamentoSelecionado.id)

  }
}
