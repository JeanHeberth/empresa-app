import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {EnderecoService} from "../../services/endereco.service";
import {Endereco} from "../../classes/endereco";
import {Departamento} from "../../classes/departamento";

@Component({
  selector: 'app-endereco-lista',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    RouterLink
  ],
  templateUrl: './endereco-lista.component.html',
  styleUrl: './endereco-lista.component.css'
})
export class EnderecoListaComponent implements OnInit {
  enderecos: Array<Endereco> = [];

  //@ts-ignore
  enderecoSelecionado: Endereco;

  constructor(private enderecoService: EnderecoService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.enderecoService
      .listarEnderecos()
      .subscribe(enderecos => this.enderecos = enderecos)
  }

  novoCadastro() {
    this.router.navigate(['/endereco-form']);
  }

  preparaDelecao(endereco: Endereco) {
    this.enderecoSelecionado = endereco;
  }
}


