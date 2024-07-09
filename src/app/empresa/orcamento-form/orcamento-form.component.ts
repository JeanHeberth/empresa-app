import {Component, OnInit} from '@angular/core';
import {OrcamentoService} from '../../services/orcamento.service';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Orcamento} from "../../classes/orcamento";
import {FormsModule, NgForm} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {Observable} from "rxjs";
import {Projeto} from "../../classes/projeto";

@Component({
  selector: 'app-orcamento-form',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './orcamento-form.component.html',
  styleUrl: './orcamento-form.component.css'
})
export class OrcamentoFormComponent implements OnInit {

  orcamento: Orcamento;

// @ts-ignore
  success: boolean = false;
  // @ts-ignore
  errors: null;
  // @ts-ignore
  id: number;

  constructor(private orcamentoServie: OrcamentoService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {

    this.orcamento = new Orcamento();
  }


  ngOnInit(): void {
    let params: Observable<Params> = this.activatedRoute.params
    params.subscribe(urlParams => {
      this.id = urlParams['id'];
      if (this.id) {
        this.orcamentoServie
          .buscarOrcamentoPorId(this.id)
          .subscribe(
            response => this.orcamento = response,
            errorResponse => this.orcamento = new Orcamento()
          )
      }
    })
  }

  onSubmit(form: NgForm) {
    if (this.id) {
      this.orcamentoServie
        .atualizarOrcamento(this.orcamento)
        .subscribe(response => {
          this.success = true;
          this.orcamento = response;
          this.timeMessage();
          form.resetForm();
        }, errorResponse =>
          this.errors = errorResponse.error.errors)
    } else {
      this.orcamentoServie
        .salvarOrcamento
        (this.orcamento)
        .subscribe(response => {
          this.success = true;
          this.orcamento = response;
          this.timeMessage();
          form.resetForm();
        }, errorResponse =>
          this.errors = errorResponse.error.errors)
    }
  }

  voltaParaPaginaDeListagem() {
    this.success = false;
    this.router.navigate(['/orcamento-lista']);
  }

  timeMessage() {
    setTimeout(() => {
      this.success = false;
    }, 1000);
  }

}
