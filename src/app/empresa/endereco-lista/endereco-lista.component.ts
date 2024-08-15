import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {EnderecoService} from "../../services/endereco.service";
import {Endereco} from "../../classes/endereco";
import {FormsModule} from "@angular/forms";
import {SseService} from "../../services/SseService.service";
import {DataService} from "../../services/data.service";
import {data} from "jquery";

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

  // @ts-ignore
  mensagemSucesso: string;
  // @ts-ignore
  mensagemErro: string;

  //@ts-ignore
  enderecoSelecionado: Endereco;

  constructor(private enderecoService: EnderecoService,
              private router: Router,
              private dataService: DataService) {
  }

  ngOnInit(): void {
    this.dataService.getUpdates().subscribe((data: any) => {
      this.enderecoService
        .listarEnderecos()
        .subscribe(enderecos => this.enderecos = enderecos)
    })
  }

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


