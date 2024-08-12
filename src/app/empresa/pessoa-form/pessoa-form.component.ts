import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {Pessoa} from "../../classes/pessoa";
import {FormsModule, NgForm, ReactiveFormsModule} from "@angular/forms";
import {CurrencyMaskModule} from "ng2-currency-mask";
import {NgxMaskDirective} from "ngx-mask";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";
import {PessoaService} from "../../services/pessoa.service";

@Component({
  selector: 'app-pessoa-form',
  standalone: true,
  imports: [
    NgForOf,
    ReactiveFormsModule,
    FormsModule,
    CurrencyMaskModule,
    NgxMaskDirective,
    NgIf
  ],
  templateUrl: './pessoa-form.component.html',
  styleUrl: './pessoa-form.component.css'
})
export class PessoaFormComponent implements OnInit{
  pessoa: Pessoa;

  // @ts-ignore
  erros: null

  success: boolean = false;



  constructor( private pessoaService: PessoaService,
               private router: Router,
               private activatedRoute: ActivatedRoute,) {
    this.pessoa = new Pessoa();
  }

  ngOnInit(): void {
  }


  voltaParaPaginaDeListagem() {
    this.success = false;
    this.router.navigate(['/pessoa-lista']);
  }


  salvarPessoa(form: NgForm) {
   this.pessoaService.salvarPessoa(this.pessoa)
     .subscribe(() => {
       this.success = true;
       form.reset();
     });

  }

  atualizarPessoa(pessoaForm: NgForm) {
    
  }
}
