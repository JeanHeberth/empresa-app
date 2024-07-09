import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {DepartamentoFormComponent} from "./empresa/departamento-form/departamento-form.component";
import {ModuleWithProviders} from "@angular/core";
import {DepartamentoListaComponent} from "./empresa/departamento-lista/departamento-lista.component";
import {EnderecoFormComponent} from "./empresa/endereco-form/endereco-form.component";
import {EnderecoListaComponent} from "./empresa/endereco-lista/endereco-lista.component";
import {FuncionarioListaComponent} from "./empresa/funcionario-lista/funcionario-lista.component";
import {FuncionarioFormComponent} from "./empresa/funcionario-form/funcionario-form.component";
import {ProjetoListaComponent} from "./empresa/projeto-lista/projeto-lista.component";
import {ProjetoFormComponent} from "./empresa/projeto-form/projeto-form.component";

export const routes: Routes = [
  {path: "home", component: HomeComponent},
  {path: "departamento-form", component: DepartamentoFormComponent},
  {path: "departamento-form/:id", component: DepartamentoFormComponent},
  {path: "departamento-lista", component: DepartamentoListaComponent},
  {path: "endereco-form", component: EnderecoFormComponent},
  {path: "endereco-form/:id", component: EnderecoFormComponent},
  {path: "endereco-lista", component: EnderecoListaComponent},
  {path: "funcionario-form", component: FuncionarioFormComponent},
  {path: "funcionario-form/:id", component: FuncionarioFormComponent},
  {path: "funcionario-lista", component: FuncionarioListaComponent},
  {path: "projeto-form", component: ProjetoFormComponent},
  {path: "projeto-form/:id", component: ProjetoFormComponent},
  {path: "projeto-lista", component: ProjetoListaComponent},


];

export const routing: ModuleWithProviders<any> = RouterModule.forRoot(routes);

