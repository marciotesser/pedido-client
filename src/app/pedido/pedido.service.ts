import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Pedido} from './pedido';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Situacao} from './situacao';

@Injectable({providedIn: 'root'})
export class PedidoService {

  url = environment.api_url_pedido;

  constructor(private http: HttpClient) {  }

  retornaPedidos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(this.url);
  }

  carregarPedido(id: number): Observable<Pedido> {
    return this.http.get<Pedido>(`${this.url}/${id}`);
  }

  gravarPedido(pedido: Pedido): Observable<Pedido> {
    return this.http.post<Pedido>(this.url, pedido);
  }

  atualizarPedido(id: number, pedido: Pedido): Observable<Pedido> {
    return this.http.put<Pedido>(this.url + `/${id}`, pedido);
  }

  finalizaPedido(id: number, pedido: Pedido): Observable<Pedido> {
    return this.http.put<Pedido>(this.url + `/finaliza-pedido/${id}`, pedido);
  }

  excluirPedido(id: number): Observable<void> {
    return this.http.delete<void>(this.url + `/${id}`);
  }

  atualizaResumo(pedido: Pedido): Observable<Pedido> {
    return this.http.post<Pedido>(`${this.url}/atualiza-resumo`, pedido);
  }

  getSituacao(situacao: Situacao): string {
    return situacao === Situacao.ABERTO ? 'Aberto' : 'Finalizado';
  }

}
