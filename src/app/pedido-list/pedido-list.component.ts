import { Component, OnInit } from '@angular/core';
import {Pedido} from '../pedido/pedido';
import {PedidoService} from '../pedido/pedido.service';
import {Situacao} from '../pedido/situacao';

@Component({
  selector: 'app-pedido-list',
  templateUrl: './pedido-list.component.html',
  styleUrls: ['./pedido-list.component.scss']
})
export class PedidoListComponent implements OnInit {

  pedidos: Pedido[];
  situacao = Situacao;

  constructor(private pedidoService: PedidoService) { }

  ngOnInit(): void {
    this.pedidoService.retornaPedidos().subscribe(p => {
      this.pedidos = p;
    });
  }

  excluirPedido(): void {

  }

  getSituacao(situacao: Situacao): string {
    return this.pedidoService.getSituacao(situacao);
  }
}
