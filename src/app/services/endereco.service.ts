import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Endereco} from "../classes/endereco";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {

  constructor(endereco: Endereco, private http: HttpClient) {
  }

  salvarEndereco(endereco: Endereco): Observable<Endereco> {
    // @ts-ignore
    return this.http.post('http://localhost:8088/api/endereco', endereco);
  }

  listarEnderecos(): Observable<Endereco[]> {
    return this.http.get<Endereco[]>('http://localhost:8088/api/endereco');
  }

  encontrarEnderecoPorId(id: number): Observable<Endereco> {
    return this.http.get<Endereco>('http://localhost:8088/api/endereco/' + id);

  }

  atualizarEndereco(endereco: Endereco): Observable<Endereco> {
    // @ts-ignore
    return this.http.put('http://localhost:8088/api/endereco/' + endereco.id, endereco);
  }

  excluirEndereco(id: number): Observable<void> {
    return this.http.delete<void>('http://localhost:8088/api/endereco/' + id);
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
