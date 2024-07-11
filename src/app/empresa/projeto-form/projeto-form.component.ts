import {Component, OnInit} from '@angular/core';
import {FormsModule, NgForm, ReactiveFormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {Projeto} from "../../classes/projeto";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ProjetoService} from "../../services/projeto.service";
import {Observable} from "rxjs";
import {NgxMaskDirective} from "ngx-mask";
import {CurrencyMaskModule} from "ng2-currency-mask";
import {data} from "jquery";

@Component({
  selector: 'app-projeto-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    NgForOf,
    NgxMaskDirective,
    CurrencyMaskModule,
  ],
  templateUrl: './projeto-form.component.html',
  styleUrl: './projeto-form.component.css'
})
export class ProjetoFormComponent implements OnInit {
  projeto: Projeto = new Projeto();
  // @ts-ignore
  success: boolean = false;
  // @ts-ignore
  errors: null;
  // @ts-ignore
  id: number;





  constructor(private projetoService: ProjetoService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.projeto = new Projeto();
  }

  ngOnInit(): void {
    let params: Observable<Params> = this.activatedRoute.params
    params.subscribe(urlParams => {
      this.id = urlParams['id'];
      if (this.id) {
        this.projetoService
          .buscarProjetoPorId(this.id)
          .subscribe(
            response => this.projeto = response,
            errorResponse => this.projeto = new Projeto()
          )
      }
    })


  }

  onSubmit(form: NgForm) {
    if (this.id) {
      this.projetoService
        .atualizarProjeto(this.projeto)
        .subscribe(response => {
          this.success = true;
          this.errors = null;
          this.projeto = response;
          form.resetForm();
        }, errorResponse => {
          //@ts-ignore
          this.errors = ['Erro ao atualizar o Projeto.']
        })
    } else {
      this.projetoService
        .salvarProjeto(this.projeto)
        .subscribe(response => {
          this.success = true;
          this.errors = null;
          this.projeto = response;
          form.resetForm();
          setTimeout(() => {
            this.success = false;
          }, 1000);
        }, errorResponse => {
          this.success = false;
          this.errors = errorResponse.error.errors;
        })
    }
  }

  voltaParaPaginaDeListagem() {
    this.router.navigate(['/projeto-lista']);
  }

  protected readonly data = data;
}
