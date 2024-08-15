import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {EnderecoService} from "../../services/endereco.service";
import {Endereco} from "../../classes/endereco";
import {FormsModule} from "@angular/forms";
import {SseService} from "../../services/SseService.service";

@Component({
  selector: 'app-endereco-lista',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    RouterLink,
    FormsModule
  ],
  templateUrl: './endereco-lista.component.html',
  styleUrl: './endereco-lista.component.css'
})
export class EnderecoListaComponent implements OnInit {
  enderecos: Array<Endereco> = [];
  events: string[] = [];

  // @ts-ignore
  mensagemSucesso: string;
  // @ts-ignore
  mensagemErro: string;

  //@ts-ignore
  enderecoSelecionado: Endereco;

  constructor(private enderecoService: EnderecoService,
              private router: Router,
              private sseService: SseService) {
  }

  ngOnInit(): void {
    this.enderecoService
      .listarEnderecos()
      .subscribe(enderecos => this.enderecos = enderecos)
  }
  ///Tesafdasfdfadsfsasfsa

  novoCadastro() {
    this.router.navigate(['/endereco-form']);
  }

  preparaDelecao(endereco: Endereco) {
    this.enderecoSelecionado = endereco;
  }

  deletarEndereco() {
    this.enderecoService
      .excluirEndereco(this.enderecoSelecionado.id)
      .subscribe(() => {
          this.mensagemSucesso = 'Endereco deletado com sucesso'
          this.ngOnInit();
        },
        error => this.mensagemErro = 'Ocorreu um erro ao deletar o Endereco'
      )
  }
}


