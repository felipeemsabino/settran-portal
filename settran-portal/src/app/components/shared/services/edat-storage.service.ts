import { Injectable } from '@angular/core';

@Injectable()
export class EdatStorageService {
  edat: any;

  constructor() { }

  setEdat(edat: any) {
    this.edat = edat;
  }
  
  getEdat() {
    return this.edat;
  }
}
