import {Component, OnInit} from '@angular/core';
import {Endereco} from '../../classes/endereco';
import {EnderecoService} from "../../services/endereco.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Observable} from "rxjs";
import {FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {CepService} from "../../servicos/cep.service";

@Component({
  selector: 'app-endereco-form',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: "./endereco-form.component.html",
  styleUrl: './endereco-form.component.css'
})
export class EnderecoFormComponent implements OnInit {
  endereco: Endereco = new Endereco();
  // @ts-ignore
  enderecoForm: FormGroup = new FormGroup({});
  success: boolean = false;
  // @ts-ignore
  errors: null;
  // @ts-ignore
  id: number;

  cep: string = '';
  isReadonly: boolean = false;
  buscaCep: any = {
    logradouro: '',
    bairro: '',
    cidade: '',
    estado: ''
  };


  constructor(private enderecoService: EnderecoService,
              private router: Router,
              private activatedRoute: ActivatedRoute,) {
    this.endereco = new Endereco();

  }

  async onCepChange() {
    if (!this.cep) {
      this.buscaCep = {
        logradouro: '',
        bairro: '',
        cidade: '',
        estado: ''
      };
      this.isReadonly = false;
      return;
    }
    const data = await this.enderecoService.buscarCep(this.cep).toPromise();
    if (data) {
      this.buscaCep = {
        logradouro: data.logradouro,
        bairro: data.bairro,
        cidade: data.cidade,
        estado: data.uf
      };
      this.isReadonly = true;  // Bloqueia os campos após preencher
    }

  }

  ngOnInit() {

    let params: Observable<Params> = this.activatedRoute.params
    params.subscribe(urlParams => {
      this.id = urlParams['id'];
      if (this.id) {
        this.enderecoService
          .encontrarEnderecoPorId(this.id)
          .subscribe(
            response => this.endereco = response,
            errorResponse => this.endereco = new Endereco()
          )
      }
    })

  }

  onSubmit() {
    this.enderecoService
      .salvarEndereco(this.endereco)
      .subscribe(response => {
          this.success = true;
          this.errors = null;
          this.endereco = response;
        }, errorResponse => {
          this.errors = errorResponse.error.errors;
          console.log(errorResponse.error.errors);
        }
      );
  }


  voltaParaPaginaDeListagem() {
    this.success = false;
    this.router.navigate(['/endereco-lista']);
  }
}
