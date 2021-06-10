import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  errorMessage: any = null;

  constructor() { }
}
