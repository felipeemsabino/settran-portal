import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes }   from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AreaAdminComponent } from './components/area-admin/area-admin.component';
import { CadastroAgenteComponent } from './components/area-admin/cadastro-agente/cadastro-agente.component';
import { CadastroRegraComponent } from './components/area-admin/cadastro-regra/cadastro-regra.component';
import { CadastroFaqComponent } from './components/area-admin/cadastro-faq/cadastro-faq.component';
import { AreaAgenteComponent } from './components/area-agente/area-agente.component';
import { ValidarDatComponent } from './components/area-agente/validar-dat/validar-dat.component';
import { RevisarDatComponent } from './components/area-agente/revisar-dat/revisar-dat.component';
import { CadastroDatComponent } from './components/area-municipe/cadastro-dat/cadastro-dat.component';
import { ConsultaDatComponent } from './components/area-municipe/consulta-dat/consulta-dat.component';
import { RetificaDatComponent } from './components/area-municipe/retifica-dat/retifica-dat.component';
import { GridComponent } from './components/shared/grid/grid.component';
import { IDataService } from './components/interfaces/idata-service'
import { AgenteService } from './components/area-admin/cadastro-agente/services/agente.service';
import { RegrasService } from './components/area-admin/cadastro-regra/services/regras.service';
import { FaqService } from './components/area-admin/cadastro-faq/services/faq.service';
import { PopupRegraComponent } from './components/area-admin/cadastro-regra/popup-regra/popup-regra.component';
import { PopupAgenteComponent } from './components/area-admin/cadastro-agente/popup-agente/popup-agente.component';
import { PopupFaqComponent } from './components/area-admin/cadastro-faq/popup-faq/popup-faq.component';
import { FaqHomeComponent } from './components/area-admin/cadastro-faq/faq-home/faq-home.component';
import { KeysPipe } from './components/pipes/keys.pipe';
import { PerguntasPreliminaresComponent } from './components/area-municipe/cadastro-dat/perguntas-preliminares/perguntas-preliminares.component';
import { SeuVeiculoComponent } from './components/area-municipe/cadastro-dat/seu-veiculo/seu-veiculo.component';
import { DadosAcidenteComponent } from './components/area-municipe/cadastro-dat/dados-acidente/dados-acidente.component';
import { OutrosVeiculosComponent } from './components/area-municipe/cadastro-dat/outros-veiculos/outros-veiculos.component';
import { TestemunhasComponent } from './components/area-municipe/cadastro-dat/testemunhas/testemunhas.component';
import { RelatoComponent } from './components/area-municipe/cadastro-dat/relato/relato.component';
import { ConfirmacaoDatComponent } from './components/area-municipe/cadastro-dat/confirmacao-dat/confirmacao-dat.component';
import { ResumoComponent } from './components/area-municipe/cadastro-dat/resumo/resumo.component';
import { EDATService } from './components/shared/services/e-dat.service';
import { HeaderComponent } from './components/shared/header/header.component';
import { ConsultadatService } from './components/area-municipe/consulta-dat/services/consultadat.service';
import { PopupControllerComponent } from './components/shared/popup-controller/popup-controller.component';

const appRoutes: Routes = [
	  {
	    path: '', component: HomeComponent
	  },
	  {
		path: 'area-admin',
		component: AreaAdminComponent,
		  children: [
			{ path: 'cadastro-agente', component: CadastroAgenteComponent },
			{ path: 'cadastro-regra', component: CadastroRegraComponent },
			{ path: 'cadastro-faq', component: CadastroFaqComponent }
		  ]
	  },
	  {
		path: 'cadastro-dat',
		component: CadastroDatComponent,
		children: [
			{ path: 'perguntas-preliminares', component: PerguntasPreliminaresComponent },
			{ path: 'seu-veiculo', component: SeuVeiculoComponent },
			{ path: 'dados-acidente', component: DadosAcidenteComponent },
			{ path: 'outros-veiculos', component: OutrosVeiculosComponent },
			{ path: 'testemunhas', component: TestemunhasComponent },
			{ path: 'relato', component: RelatoComponent },
			{ path: 'confirmacao-dat', component: ConfirmacaoDatComponent },
			{ path: 'resumo', component: ResumoComponent }
		]
	  },
	  { path: 'consulta-dat', component: ConsultaDatComponent },
	  { path: 'cadastro-regra', component: CadastroRegraComponent },
	  { path: 'cadastro-faq', component: CadastroFaqComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AreaAdminComponent,
    CadastroAgenteComponent,
    CadastroRegraComponent,
    CadastroFaqComponent,
    AreaAgenteComponent,
    ValidarDatComponent,
    RevisarDatComponent,
    CadastroDatComponent,
    ConsultaDatComponent,
    RetificaDatComponent,
	GridComponent,
	PopupRegraComponent,
	PopupAgenteComponent,
	PopupFaqComponent,
	FaqHomeComponent,
	KeysPipe,
	PerguntasPreliminaresComponent,
	SeuVeiculoComponent,
	DadosAcidenteComponent,
	OutrosVeiculosComponent,
	TestemunhasComponent,
	RelatoComponent,
	ConfirmacaoDatComponent,
	ResumoComponent,
	HeaderComponent,
	PopupControllerComponent
  ],
  imports: [
    BrowserModule,
	RouterModule.forRoot(appRoutes),
	FormsModule,
	HttpModule
  ],
  providers:
  [ {
      provide: 'IDataService', useClass: AgenteService, multi: true
    },
    {
      provide: 'IDataService', useClass: RegrasService, multi: true
    },
    {
      provide: 'IDataService', useClass: FaqService, multi: true
    }, EDATService, ConsultadatService, PopupControllerComponent! ],
  bootstrap: [AppComponent]
})
export class AppModule { }
