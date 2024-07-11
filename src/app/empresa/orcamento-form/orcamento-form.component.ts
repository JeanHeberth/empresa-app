import {Component, OnInit} from '@angular/core';
import {OrcamentoService} from '../../services/orcamento.service';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Orcamento} from "../../classes/orcamento";
import {FormsModule, NgForm} from "@angular/forms";
import {CurrencyPipe, DatePipe, NgForOf, NgIf} from "@angular/common";
import {Observable} from "rxjs";
import {NgxMaskDirective} from "ngx-mask";
import {CurrencyMaskConfig, CurrencyMaskModule, CURRENCY_MASK_CONFIG} from "ng2-currency-mask";


export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: "left",
  allowNegative: true,
  decimal: ",",
  precision: 2,
  prefix: "",
  suffix: "",
  thousands: ".",
};


@Component({
  selector: 'app-orcamento-form',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    NgxMaskDirective,
    CurrencyPipe,
    CurrencyMaskModule,
    DatePipe

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


  model =  {
    dataConverter: '',
  };


  constructor(private orcamentoService: OrcamentoService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private datePipe: DatePipe
  ) {
    this.orcamento = new Orcamento();
  }


  ngOnInit(): void {
    let params: Observable<Params> = this.activatedRoute.params
    params.subscribe(urlParams => {
      this.id = urlParams['id'];
      if (this.id) {
        this.orcamentoService
          .buscarOrcamentoPorId(this.id)
          .subscribe(
            response => this.orcamento = response,
            errorResponse => this.orcamento = new Orcamento()
          )
      }
    })
  }

  salvarOrcamento(form: NgForm) {
    this.formatAndSubmit(form, 'salvar');
    console.log(this.orcamento.dataInicio)
    console.log(this.orcamento.dataFinal)

  }

  atualizarOrcamento(form: NgForm) {
    this.formatAndSubmit(form, 'atualizar');
  }

  private formatAndSubmit(form: NgForm, action: string) {

    if (this.model.dataConverter) {
      const formattedDate =
        this.datePipe.transform(
          this.model.dataConverter, 'yyyy-MM-dd');

      if (formattedDate) {
        this.orcamento.dataInicio = formattedDate;
        this.orcamento.dataFinal = formattedDate;

        if (action === 'atualizar' && this.id) {
          this.orcamentoService.atualizarOrcamento(
            this.orcamento)
            .subscribe(
              response => {
                this.success = true;
                this.orcamento = response;
                this.timeMessage();
                form.resetForm();
              },
              errorResponse => this.errors =
                errorResponse.error.errors
            );
        } else if (action === 'salvar') {
          this.orcamentoService.salvarOrcamento(
            this.orcamento)
            .subscribe(
              response => {
                this.success = true;
                this.orcamento = response;
                this.timeMessage();
                form.resetForm();
              },
              errorResponse =>
                this.errors = errorResponse.error.errors
            );
        }
      } else {
        console.error('Ação desconhecida ou ID não definido para atualização.');

      }
    } else {
      console.error('Erro ao formatar a data.', this.model.dataConverter);
      console.error('Data retornada:.', this.orcamento.dataInicio);
      console.error('Data retornada:.', this.orcamento.dataFinal);
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
