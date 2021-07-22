import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PedidoListComponent} from './pedido-list/pedido-list.component';
import {PedidoComponent} from './pedido/pedido.component';


const routes: Routes = [
  {path: '', component: PedidoListComponent},
  {path: 'pedido', component: PedidoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
