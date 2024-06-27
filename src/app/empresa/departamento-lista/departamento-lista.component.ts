import {Component, OnInit} from '@angular/core';
import {Departamento} from "../../classes/departamento";
import {DepartamentoService} from "../../services/departamento.service";
import {NgForOf, NgIf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-departamento-lista',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink,
    NgIf
  ],
  templateUrl: './departamento-lista.component.html',
  styleUrl: './departamento-lista.component.css'
})
export class DepartamentoListaComponent implements OnInit {
  departamentos: Array<Departamento> = [];
  // @ts-ignore
  departamentoSelecionado: Departamento;
  // @ts-ignore
  mensagemSucesso: string;
  // @ts-ignore
  mensagemErro: string;

  constructor(private departamentoService: DepartamentoService,
              private router: Router) {
  }


  ngOnInit(): void {
    this.departamentoService
      .buscarDepartamentos()
      .subscribe(departamentos => this.departamentos = departamentos)
  }


  novoCadastro() {
    this.router.navigate(['/departamento-form']);
  }

  preparaDelecao(departamento: Departamento) {
    this.departamentoSelecionado = departamento;
  }

  deletarCliente() {
    this.departamentoService
      .deletarDepartamento(this.departamentoSelecionado)
      .subscribe(response => {
          this.mensagemSucesso = 'Departamento deletado com sucesso'
          this.ngOnInit();
        },
        error => this.mensagemErro = 'Ocorreu um erro ao deletar o Departamento'
      )

  }

}
