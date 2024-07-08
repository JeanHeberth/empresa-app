import {Component, OnInit, inject} from '@angular/core';
import {Departamento} from "../../classes/departamento";
import {FormsModule, NgForm} from "@angular/forms";
import {DepartamentoService} from "../../services/departamento.service";
import {NgFor, NgForOf, NgIf} from "@angular/common";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Observable} from "rxjs";


@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [FormsModule, NgIf, NgForOf],
  templateUrl: './departamento-form.component.html',
  styleUrl: './departamento-form.component.css',
})
export class DepartamentoFormComponent implements OnInit {

  departamento: Departamento;
  success: boolean = false;
  // @ts-ignore
  errors: null;
  // @ts-ignore
  id: number;

  constructor(private departamentoService: DepartamentoService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.departamento = new Departamento();
  }

  ngOnInit() {
    let params: Observable<Params> = this.activatedRoute.params
    params.subscribe(urlParams => {
      this.id = urlParams['id'];
      if (this.id) {
        this.departamentoService
          .buscarDepartamentoPorId(this.id)
          .subscribe(
            response => this.departamento = response,
            errorResponse => this.departamento = new Departamento()
          )
      }
    })
  }

  clearDepartamentoFields() {
    this.departamento.nome = '';
    // @ts-ignore
    this.departamento.dataCadastro = '';
    // @ts-ignore
    this.departamento.numero = '';

  }



  onSubmit(form: NgForm) {
    if (this.id) {
      this.departamentoService
        .atualizarDepartamento(this.departamento)
        .subscribe(response => {
            this.success = true;
            this.errors = null;
            // this.departamento = response;
          }, errorResponse => {
            //@ts-ignore
            this.errors = ['Erro ao atualizar o Departamento.']
          }
        );
    } else {
      this.departamentoService
        .salvarDepartamento(this.departamento)
        .subscribe(response => {
            this.success = true;
            this.errors = null;
            this.departamento = response;
            this.clearDepartamentoFields()
          form.resetForm();

          }, errorResponse => {
            this.errors = errorResponse.error.errors;
            console.log(errorResponse.error.errors);
          }
        );

      // Ocultar a mensagem de sucesso após 3 segundos
      setTimeout(() => {
        this.success = false;
      }, 1500);
    }
  }

  voltaParaPaginaDeListagem() {
    this.success = false;
    this.router.navigate(['/departamento-lista']);
  }
}
