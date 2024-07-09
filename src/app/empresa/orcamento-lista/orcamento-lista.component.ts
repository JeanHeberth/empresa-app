import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {Orcamento} from "../../classes/orcamento";
import {OrcamentoService} from "../../services/orcamento.service";
import {Router, RouterLink} from "@angular/router";
import {Projeto} from "../../classes/projeto";

@Component({
  selector: 'app-orcamento-lista',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    RouterLink
  ],
  templateUrl: './orcamento-lista.component.html',
  styleUrl: './orcamento-lista.component.css'
})
export class OrcamentoListaComponent implements OnInit {
  orcamentos: Array<Orcamento> = [];

  // @ts-ignore
  orcamentoSelecionado: Orcamento;
  // @ts-ignore
  mensagemSucesso: string;
  // @ts-ignore
  mensagemErro: string;

  constructor(private orcamentoService: OrcamentoService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.orcamentoService
      .listarOrcamentos()
      .subscribe(orcamentos =>
        this.orcamentos = orcamentos)
  }

  novoCadastro() {
    this.router.navigate(['/orcamento-form']);
  }

  preparaDelecao(orcamento: Orcamento) {
    this.orcamentoSelecionado = orcamento;
  }

  deletarProjeto() {
    this.orcamentoService
      .deletarOrcamento(this.orcamentoSelecionado)
      .subscribe(
        () => {
          this.mensagemSucesso = 'Orcamento excluído com sucesso';
          this.ngOnInit();
        },
        error => this.mensagemErro = error
      )
  }

}
