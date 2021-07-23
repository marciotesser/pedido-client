import { Component, OnInit } from '@angular/core';
import {Pedido} from '../pedido/pedido';
import {PedidoService} from '../pedido/pedido.service';
import {Situacao} from '../pedido/situacao';
import {ConfirmationService, MessageService} from 'primeng/api';

@Component({
  selector: 'app-pedido-list',
  templateUrl: './pedido-list.component.html',
  styleUrls: ['./pedido-list.component.scss']
})
export class PedidoListComponent implements OnInit {

  pedidos: Pedido[];
  situacao = Situacao;

  constructor(private pedidoService: PedidoService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.listarPedidos();
  }

  excluirPedido(pedido: Pedido): void {
    if (pedido.situacao === Situacao.ABERTO) {
      this.confirmationService.confirm({
        message: `Deseja excluir o pedido de número "${pedido.id}"?`,
        acceptLabel: 'Sim',
        rejectLabel: 'Não',
        accept: () => {
          this.pedidoService.excluirPedido(pedido.id).subscribe(p => {
            this.listarPedidos();
            this.messageService.add({severity: 'success', summary: 'Sucesso', detail: 'Pedido excluído!'});
          }, error => {
            this.messageService.add({severity: 'error', summary: 'Erro', detail: 'Pedido não encontrado!'});
          });
        }
      });
    }
  }

  listarPedidos(): void {
    this.pedidoService.retornaPedidos().subscribe(p => {
      this.pedidos = p;
    });
  }

  getSituacao(situacao: Situacao): string {
    return this.pedidoService.getSituacao(situacao);
  }
}
