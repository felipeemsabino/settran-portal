import { Injectable } from '@angular/core';

@Injectable()
export class EDATService {

  eDAT: any;
  
  constructor() {
    this.eDAT = {
	  "perguntas": [{"p1":"S"},{"p2":"N"}],
	  "seu_veiculo": [],
	  "dados_acidente": [],
	  "outros_veiculos": [],
	  "testemunhas": [],
	  "relato_acidente": [],
	  "confirmacao_dat": [],
	  "resumo": []
	};
  }

}
