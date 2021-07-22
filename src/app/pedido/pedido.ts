import {PedidoProduto} from '../pedido-produto/pedidoProduto';
import {Situacao} from './situacao';

export class Pedido {

  id: number;
  data: Date;
  situacao: Situacao;
  razaoSocial: string;
  cnpj: string;
  telefone: string;
  email: string;
  quantidadeProdutos: number;
  quantidadeItens: number;
  totalPedido: number;
  pedidoProdutos: PedidoProduto[];

}
