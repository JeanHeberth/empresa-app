import {Component, OnInit} from '@angular/core';
import {Endereco} from '../../classes/endereco';
import {EnderecoService} from "../../servicos/endereco.service";
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
    // if (this.cep.length === 8) {
      this.buscaCep = await this.enderecoService.buscarCep(this.cep).toPromise();
      this.isReadonly = true;
    }
  // }

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
  }


  voltaParaPaginaDeListagem() {
    this.success = false;
    this.router.navigate(['/endereco-lista']);
  }
}
