import {Component, OnInit} from '@angular/core';
import {FormsModule, NgForm, ReactiveFormsModule} from "@angular/forms";
import {Funcionario} from "../../classes/Funcionario";
import {Observable} from "rxjs";
import {Router, RouterLink} from "@angular/router";
import {FuncionarioService} from "../../services/funcionario.service";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-funcionario-form',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    ReactiveFormsModule,
    FormsModule
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

  constructor(private funcionarioService: FuncionarioService,
              private router: Router) {
    this.funcionario = new Funcionario();
  }

  ngOnInit() {

  }

  onSubmit(form: NgForm) {
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

  voltaParaPaginaDeListagem() {
    this.success = false;
    this.router.navigate(['/funcionario-lista']);
  }

}
