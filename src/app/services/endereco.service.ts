import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Endereco} from "../classes/endereco";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {

  private apiUrl = 'http://localhost:8088/api/endereco'


  constructor(endereco: Endereco, private http: HttpClient) {
  }

  salvarEndereco(endereco: Endereco): Observable<Endereco> {
    // @ts-ignore
    return this.http.post(`${this.apiUrl}`, endereco);
  }

  listarEnderecos(): Observable<Endereco[]> {
    return this.http.get<Endereco[]>(`${this.apiUrl}`);
  }

  encontrarEnderecoPorId(id: number): Observable<Endereco> {
    return this.http.get<Endereco>(`${this.apiUrl}/` + id);

  }

  atualizarEndereco(endereco: Endereco): Observable<Endereco> {
    // @ts-ignore
    return this.http.put(`${this.apiUrl}/` + endereco.id, endereco);
  }

  excluirEndereco(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/` + id);
  }

  buscarCep(cep: string): Observable<any> {
    return this.http.get(`https://viacep.com.br/ws/${cep}/json/`).pipe(
      map((data: any) => ({
        logradouro: data.logradouro,
        bairro: data.bairro,
        cidade: data.localidade,
        estado: data.uf
      }))
    );
  }
}
