import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormsModule, NgForm, ReactiveFormsModule} from "@angular/forms";
import {Funcionario} from "../../classes/funcionario";
import {Observable} from "rxjs";
import {ActivatedRoute, Params, Router, RouterLink} from "@angular/router";
import {FuncionarioService} from "../../services/funcionario.service";
import {NgForOf, NgIf} from "@angular/common";
import {NgxMaskDirective} from "ngx-mask";
import {NgxCurrencyDirective} from "ngx-currency";
import {CurrencyMaskModule} from "ng2-currency-mask";
import {data} from "jquery";

@Component({
  selector: 'app-funcionario-form',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    ReactiveFormsModule,
    FormsModule,
    NgxMaskDirective,
    CurrencyMaskModule,
  ],
  templateUrl: './funcionario-form.component.html',
  styleUrl: './funcionario-form.component.css'
})
export class FuncionarioFormComponent implements OnInit {
  funcionario: Funcionario;

  // @ts-ignore
  success: boolean = false;
  // @ts-ignore
  errors: null;
  // @ts-ignore
  id: number;


  isReadonly: boolean = false;


  constructor(private funcionarioService: FuncionarioService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
             ) {
    this.funcionario = new Funcionario();


  }


  ngOnInit() {
    let params: Observable<Params> = this.activatedRoute.params
    params.subscribe(urlParams => {
      this.id = urlParams['id'];
      if (this.id) {
        this.funcionarioService
          .buscarFuncionarioPorId(this.id)
          .subscribe(
            response => this.funcionario = response,
            errorResponse => this.funcionario = new Funcionario()
          )
      }
    })

  }

  onSubmit(form:NgForm) {
    if (this.id) {
      this.funcionarioService
        .atualizarFuncionario(this.funcionario)
        .subscribe(response => {
            this.success = true;
            this.errors = null;
            this.funcionario = response;
          }, errorResponse => {
            //@ts-ignore
            this.errors = ['Erro ao atualizar o Funcionario.']
            console.log(errorResponse.error.errors);
          }
        );
    } else {
      this.funcionarioService
        .salvarFuncionario(this.funcionario)
        .subscribe(response => {
            this.success = true;
            this.errors = null;
            this.funcionario = response;
            form.resetForm();
            setTimeout(() => {
              this.success = false;
            }, 1000);

            // Exibir a mensagem de sucesso
            this.success = true;
          }, errorResponse => {
            this.errors = errorResponse.error.errors;
            console.log(errorResponse.error.errors);
          }
        );
    }
  }

  async onNomePorCpf() {

    if (!this.funcionario.cpf) {
      this.clearFuncionarioFields();
      this.isReadonly = false;
      return;
    }
    const data = await this.funcionarioService.buscarNomePorCpf(this.funcionario.cpf).toPromise();
    if (data) {
      // @ts-ignore
      this.funcionario.nomePessoa = data[0].nomePessoa;
      this.isReadonly = true;
    }
  }

  async onMatriculaSupervisor(){

    if (!this.funcionario.matriculaSupervisor) {
      this.clearMatriculaField();
      this.isReadonly = false;
      return;
    }
    const data = await this.funcionarioService.buscarMatriculaSupervisor(this.funcionario.matriculaSupervisor).toPromise();
    if (data) {
      // @ts-ignore
      this.funcionario.nomeSupervisor = data.nomePessoa;
      this.isReadonly = true;
    }
  }

  async onDataAdmissaoChange() {

    if (!this.funcionario.cpf || !this.funcionario.dataAdmissao) {
      this.clearMatriculaField();
      this.isReadonly = false;
      return;
    }

    try {
      const data = await this.funcionarioService.generateMatricula(this.funcionario.dataAdmissao, this.funcionario.cpf).toPromise();
      console.log("Data convertida:", data)
      if (data) {
        // @ts-ignore
        this.funcionario.matricula = data.matricula;
        this.isReadonly = true;
        // @ts-ignore
      }
    } catch (error) {
      console.error('Error generating matricula', error);


    }
  }

  formatDate(date: string): string | null {
    const dateParts = date.split('/');
    if (dateParts.length === 3) {
      const [day, month, year] = dateParts;
      if (day.length === 2 && month.length === 2 && year.length === 4) {
        return `${year}-${month}-${day}`;
      }
    }
    return null;
  }

  clearMatriculaField() {
    this.funcionario.matricula = '';
  }


  voltaParaPaginaDeListagem() {
    this.success = false;
    this.router.navigate(['/funcionario-lista']);
  }


  clearFuncionarioFields() {
    this.funcionario.nomePessoa = '';
    this.isReadonly = true;
  }
}
