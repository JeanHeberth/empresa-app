import {Component, OnInit} from '@angular/core';
import {Funcionario} from "../../classes/funcionario";
import {FuncionarioService} from "../../services/funcionario.service";
import {Router, RouterLink} from "@angular/router";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-funcionario-lista',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    NgForOf
  ],
  templateUrl: './funcionario-lista.component.html',
  styleUrl: './funcionario-lista.component.css'
})
export class FuncionarioListaComponent implements OnInit {
  funcionarios: Array<Funcionario> = [];

  //@ts-ignore
  mensagemSucesso: string;
  // @ts-ignore
  mensagemErro: string;

  //@ts-ignore
  funcionarioSelecionado: Funcionario;

  constructor(private funcionarioService: FuncionarioService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.funcionarioService
      .listarFuncionarios()
      .subscribe(funcionarios => this.funcionarios = funcionarios)
  }

  novoCadastro() {
    this.router.navigate(['/funcionario-form']);
  }

  preparaDelecao(funcionario: Funcionario) {
    this.funcionarioSelecionado = funcionario;
  }

  deletarFuncionario() {
    this.funcionarioService
      .deletarFuncionario(this.funcionarioSelecionado)
      .subscribe(() => {
        this.mensagemSucesso = 'Funcionário deletado com sucesso!';
        this.ngOnInit();
      }, ex => {
        if (ex.status === 400) {
          this.mensagemErro = ex.error.erro;
        }
      })
  }
}
