import {Component, OnInit} from '@angular/core';
import {Endereco} from '../../classes/endereco';
import {EnderecoService} from "../../services/endereco.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Observable} from "rxjs";
import {FormsModule, NgForm, ReactiveFormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {NgxCurrencyDirective} from "ngx-currency";
import {NgxMaskDirective} from "ngx-mask";

@Component({
  selector: 'app-endereco-form',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    ReactiveFormsModule,
    FormsModule,
    NgxCurrencyDirective,
    NgxMaskDirective
  ],
  templateUrl: "./endereco-form.component.html",
  styleUrl: './endereco-form.component.css'
})
export class EnderecoFormComponent implements OnInit {
  endereco: Endereco = new Endereco();
  // @ts-ignore
  success: boolean = false;
  // @ts-ignore
  errors: null;
  // @ts-ignore
  id: number;

  // @ts-ignore
  endereco: any = {
    id: '',
    cep: '',
    logradouro: '',
    bairro: '',
    cidade: '',
    estado: '',
    complemento: '',
    casa: ''
  };
  isReadonly: boolean = false;

  constructor(private enderecoService: EnderecoService,
              private router: Router,
              private activatedRoute: ActivatedRoute,) {
    this.endereco = new Endereco();
  }


  async onCepChange() {
    if (!this.endereco.cep) {
      this.clearEnderecoFields();
      this.isReadonly = false;
      return;
    }

    if (this.endereco.cep.length === 8) {  // Verifica se o CEP tem 8 caracteres antes de fazer a busca
      try {
        const data = await this.enderecoService.buscarCep(this.endereco.cep).toPromise();
        if (data) {
          this.endereco.logradouro = data.logradouro;
          this.endereco.bairro = data.bairro;
          this.endereco.cidade = data.cidade;
          this.endereco.estado = data.estado;
          this.isReadonly = true;  // Bloqueia os campos após preencher
        }
      } catch (error) {
        console.error('Erro ao buscar o CEP:', error);
        // Tratar erro caso a busca do CEP falhe
      }
    }
  }

  clearEnderecoFields() {
    this.endereco.cep = '';
    this.endereco.logradouro = '';
    this.endereco.bairro = '';
    this.endereco.cidade = '';
    this.endereco.estado = '';
    this.endereco.complemento = '';
    this.endereco.casa = '';
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

  onSubmit(form: NgForm) {
    if (this.id) {
      this.enderecoService
        .atualizarEndereco(this.endereco)
        .subscribe(response => {
            this.success = true;
            this.errors = null;
            this.endereco = response;
          },errorResponse => {
            //@ts-ignore
            this.errors = ['Erro ao atualizar o Endereco.']
            console.log(errorResponse.error.errors);
          }
        );
    } else {
      this.enderecoService
        .salvarEndereco(this.endereco)
        .subscribe(response => {
            this.success = true;
            this.errors = null;
            this.endereco = response;
            this.clearEnderecoFields()
            form.resetForm();

            // Exibir a mensagem de sucesso
            this.success = true;

            // Ocultar a mensagem de sucesso após 3 segundos
            setTimeout(() => {
              this.success = false;
            }, 1000);


          }, errorResponse => {
            this.errors = errorResponse.error.errors;
            console.log(errorResponse.error.errors);
          }
        );
    }
  }

  voltaParaPaginaDeListagem() {
    this.success = false;
    this.router.navigate(['/endereco-lista']);
  }
}
