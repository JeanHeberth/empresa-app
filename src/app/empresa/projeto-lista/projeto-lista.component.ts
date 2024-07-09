import {Component, OnInit} from '@angular/core';
import {Projeto} from "../../classes/projeto";
import {ProjetoService} from "../../services/projeto.service";
import {Router, RouterLink} from "@angular/router";
import {NgForOf, NgIf} from "@angular/common";


@Component({
  selector: 'app-projeto-lista',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    NgForOf
  ],
  templateUrl: './projeto-lista.component.html',
  styleUrl: './projeto-lista.component.css'
})
export class ProjetoListaComponent implements OnInit {
  projetos: Array<Projeto> = [];

  // @ts-ignore
  projetoSelecionado: Projeto;
  // @ts-ignore
  mensagemSucesso: string;
  // @ts-ignore
  mensagemErro: string;


  constructor(private projetoService: ProjetoService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.projetoService
      .listarProjetos()
      .subscribe(projetos =>
        this.projetos = projetos)
  }

  novoCadastro() {
    this.router.navigate(['/projeto-form']);
  }

  deletarProjeto() {
    this.projetoService
      .deletarProjeto(this.projetoSelecionado)
      .subscribe(
        () => {
          this.mensagemSucesso = 'Projeto deletado com sucesso!';
          this.ngOnInit();
        },
        error => this.mensagemErro = error
      );
  }

  preparaDelecao(projeto: Projeto) {
    this.projetoSelecionado = projeto;
  }
}


