import {BrowserModule} from '@angular/platform-browser';
import {NgModule, LOCALE_ID} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {PedidoComponent} from './pedido/pedido.component';
import {HttpClientModule} from '@angular/common/http';
import {TableModule} from 'primeng/table';
import { PedidoListComponent } from './pedido-list/pedido-list.component';
import {CardModule} from 'primeng/card';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ButtonModule} from 'primeng/button';
import {RippleModule} from 'primeng/ripple';

import ptBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import {ToastModule} from 'primeng/toast';
import {ConfirmationService, MessageService} from 'primeng/api';
import {InputTextModule} from 'primeng/inputtext';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CalendarModule} from 'primeng/calendar';
import {InputMaskModule} from 'primeng/inputmask';
import { PedidoProdutoComponent } from './pedido-produto/pedido-produto.component';
import {DialogModule} from 'primeng/dialog';
import {NgxCurrencyModule} from 'ngx-currency';
import {ConfirmDialogModule} from 'primeng/confirmdialog';

registerLocaleData(ptBr);

@NgModule({
  declarations: [
    AppComponent,
    PedidoComponent,
    PedidoListComponent,
    PedidoProdutoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    TableModule,
    CardModule,
    ButtonModule,
    RippleModule,
    ToastModule,
    InputTextModule,
    FormsModule,
    CalendarModule,
    InputMaskModule,
    ReactiveFormsModule,
    DialogModule,
    NgxCurrencyModule,
    ConfirmDialogModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' },
    MessageService,
    ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
