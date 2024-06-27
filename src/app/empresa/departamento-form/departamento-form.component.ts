import {Component, OnInit, inject} from '@angular/core';
import {Departamento} from "../../classes/departamento";
import {FormsModule} from "@angular/forms";
import {DepartamentoService} from "../../servicos/departamento.service";
import {NgForOf, NgIf} from "@angular/common";
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

  departamento: Departamento = new Departamento();
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


  onSubmit() {
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
          }, errorResponse => {
            this.errors = errorResponse.error.errors;
            console.log(errorResponse.error.errors);
          }
        );
    }
  }

  voltaParaPaginaDeListagem() {
    this.success = false;
    this.router.navigate(['/departamento-lista']);
  }
}
