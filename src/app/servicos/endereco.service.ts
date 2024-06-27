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

  listarEnderecos(): Observable<Endereco[]> {
    return this.http.get<Endereco[]>('http://localhost:8088/api/endereco');
  }

  encontrarEnderecoPorId(id: number): Observable<Endereco> {
    return this.http.get<Endereco>('http://localhost:8088/api/endereco/' + id);

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
