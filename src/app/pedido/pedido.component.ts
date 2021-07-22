import {Component, OnInit, ViewChild} from '@angular/core';
import {Pedido} from './pedido';
import {PedidoService} from './pedido.service';
import {ActivatedRoute, Router} from '@angular/router';
import {delay} from 'rxjs/operators';
import {MessageService} from 'primeng/api';
import {FormControl, NgForm} from '@angular/forms';
import {Situacao} from './situacao';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.scss']
})
export class PedidoComponent implements OnInit {

  @ViewChild('form', {static: false}) formPedido: NgForm;

  pedido: Pedido;
  situacao = Situacao;

  constructor(private pedidoService: PedidoService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private messageService: MessageService) { }

  ngOnInit(): void {

    this.newPedido();

    this.activatedRoute.queryParams.pipe(delay(1)).subscribe(e => {
      const id = e.id;

      setTimeout(() => {
        if (id) {
          this.editar(id);
        } else {
          this.novo();
        }
      });
    });

  }

  newPedido(): void {
    this.pedido = new Pedido();
    this.pedido.data = new Date();
    this.pedido.situacao = Situacao.ABERTO;
    this.pedido.quantidadeProdutos = 0;
    this.pedido.quantidadeItens = 0;
    this.pedido.totalPedido = 0;
    this.pedido.pedidoProdutos = [];
  }

  novo(): void {
    this.newPedido();
  }

  editar(id: number): void {
    this.pedidoService.carregarPedido(id).subscribe(p => {
      this.pedido = p;
      this.pedido.data = new Date(this.pedido.data);
    }, error => {
      this.messageService.add({severity: 'error', summary: 'Erro', detail: 'Pedido não encontrado!'});
    });
  }

  gravarPedido(): void {
    if (this.formPedido.valid) {
      if (!this.pedido.id) {
        this.pedidoService.gravarPedido(this.pedido).subscribe(p => {
          this.pedido = p;
          this.messageService.add({severity: 'success', summary: 'Sucesso', detail: 'Pedido salvo com sucesso!'});
        });
      } else {
        this.pedidoService.atualizarPedido(this.pedido.id, this.pedido).subscribe(p => {
          this.pedido = p;
          this.messageService.add({severity: 'success', summary: 'Sucesso', detail: 'Pedido salvo com sucesso!'});
        });
      }
    } else {
      this.validaForm();
    }
  }

  private validaForm() {
    if (this.formPedido.status !== 'DISABLED') {
      // tslint:disable-next-line:forin
      for (const eachControl in this.formPedido.controls) {
        (this.formPedido.controls[eachControl] as FormControl).markAsDirty();
        (this.formPedido.controls[eachControl] as FormControl).updateValueAndValidity();
      }
    }
  }

  finalizarPedido(): void {
    this.pedidoService.finalizaPedido(this.pedido.id, this.pedido).subscribe(p => {
      this.pedido = p;
      this.messageService.add({severity: 'success', summary: 'Sucesso', detail: 'Pedido Finalizado!'});
    }, error => {
      this.messageService.add({severity: 'error', summary: 'Erro', detail: error.error.message.toString()});
    });
  }

  getSituacao(situacao: Situacao): string {
    return this.pedidoService.getSituacao(situacao);
  }
}
