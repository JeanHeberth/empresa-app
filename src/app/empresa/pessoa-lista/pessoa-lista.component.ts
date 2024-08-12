import {Component} from '@angular/core';
import {Pessoa} from "../../classes/pessoa";
import {Router, RouterLink} from "@angular/router";
import {Endereco} from "../../classes/endereco";
import {EnderecoService} from "../../services/endereco.service";
import {PessoaService} from "../../services/pessoa.service";
import {Funcionario} from "../../classes/funcionario";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-pessoa-lista',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    NgForOf
  ],
  templateUrl: './pessoa-lista.component.html',
  styleUrl: './pessoa-lista.component.css'
})
export class PessoaListaComponent {

  pessoas: Array<Pessoa> = [];
  // @ts-ignore
  mensagemSucesso: string;
  // @ts-ignore
  mensagemErro: string;

  //@ts-ignore
  pessoaSelecionado: Pessoa;

  constructor(private pessoaService: PessoaService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.pessoaService
      .listarPessoas()
      .subscribe(pessoas => this.pessoas = pessoas)

  }


  novoCadastro() {
    this.router.navigate(['/pessoa-form']);
  }

  preparaPessoa(pessoa: Pessoa) {
    this.pessoaSelecionado = pessoa;
  }

  preparaDelecao(pessoa: Pessoa){
    this.pessoaSelecionado = pessoa;
  }

  deletarPessoa() {
    this.pessoaService
      .deletarPessoa(this.pessoaSelecionado)
      .subscribe(() => {
        this.mensagemSucesso = 'Pessoa deletada com sucesso!';
        this.ngOnInit();
      }, ex => {
        if (ex.status === 400) {
          this.mensagemErro = ex.error.erro;
        }
      })
  }
}
