import {Component} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {EnderecoService} from "../../services/endereco.service";
import {CepService} from "../../servicos/cep.service";

@Component({
  selector: 'app-cep',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './cep.component.html',
  styleUrl: './cep.component.css'
})
export class CepComponent {

  cep: string = '';
  buscaCep: any = {
    logradouro: '',
    bairro: '',
    cidade: '',
    estado: ''
  };

  constructor(private enderecoService: EnderecoService,
              private cepService: CepService) {
  }

  async onCepChange() {
    if (this.cep) {
      this.buscaCep = await this.cepService.buscarCep(this.cep).toPromise();
      // this.endereco = await this.enderecoService.buscarCep(this.cep).toPromise();
    }
  }

}
