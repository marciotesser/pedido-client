import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Pedido} from '../pedido/pedido';
import {PedidoProduto} from './pedidoProduto';
import {FormControl, NgForm} from '@angular/forms';
import {ConfirmationService} from 'primeng/api';
import {Situacao} from '../pedido/situacao';

@Component({
  selector: 'app-pedido-produto',
  templateUrl: './pedido-produto.component.html',
  styleUrls: ['./pedido-produto.component.scss']
})
export class PedidoProdutoComponent implements OnInit {

  @Input() pedido: Pedido;
  @Output() atualizaResumo = new EventEmitter();
  @ViewChild('formProduto', {static: false}) form: NgForm;
  showCadastroProduto = false;
  pedidoProduto: PedidoProduto;
  situacao = Situacao;

  constructor(private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.pedidoProduto = new PedidoProduto();
  }

  adicionarProduto(): void {
    this.pedidoProduto = new PedidoProduto();
    this.pedidoProduto.quantidade = 1;
    this.pedidoProduto.preco = 0;
    this.pedidoProduto.total = 0;
    this.showCadastroProduto = true;
  }

  editarProduto(pedidoProduto: PedidoProduto): void {
    this.pedidoProduto = pedidoProduto;
    this.showCadastroProduto = true;
  }

  salvarProduto(): void {
    if (this.form.valid) {
      const index = this.pedido.pedidoProdutos.indexOf(this.pedidoProduto);
      if (index !== -1) {
        this.pedido.pedidoProdutos[index] = this.pedidoProduto;
      } else {
        this.pedido.pedidoProdutos.push(this.pedidoProduto);
      }
      this.atualizaResumo.emit();
      this.showCadastroProduto = false;
    } else {
      this.validaForm();
    }
  }

  excluirProduto(pedidoProduto: PedidoProduto): void {
    if (this.pedido.situacao === Situacao.ABERTO) {
      this.confirmationService.confirm({
          message: `Deseja excluir o produto "${pedidoProduto.produto}"?`,
          acceptLabel: 'Sim',
          rejectLabel: 'Não',
          accept: () => {
            this.pedido.pedidoProdutos = this.pedido.pedidoProdutos.filter(p => p.id !== pedidoProduto.id);
            this.atualizaResumo.emit();
          }
        });
    }
  }

  calculaTotal(): void {
    this.pedidoProduto.total = this.pedidoProduto.quantidade * this.pedidoProduto.preco;
  }

  private validaForm() {
    if (this.form.status !== 'DISABLED') {
      // tslint:disable-next-line:forin
      for (const eachControl in this.form.controls) {
        (this.form.controls[eachControl] as FormControl).markAsDirty();
        (this.form.controls[eachControl] as FormControl).updateValueAndValidity();
      }
    }
  }
}
