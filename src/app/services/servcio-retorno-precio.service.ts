import { Injectable, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServcioRetornoPrecioService {
  @Output() disparadorDePrecio: EventEmitter<any> = new EventEmitter;

  // 1. BehaviorSubject para almacenar y emitir los datos del formulario
  private _formularioData = new BehaviorSubject<any>(null);

  // 2. Observable público para que los componentes se suscriban (es una convención)
  public formularioData$: Observable<any> = this._formularioData.asObservable();

  constructor() { }

  emitirDatos(data: any) {
    this.disparadorDePrecio.emit(data);
  }

  setFormularioData(data: any) {
    // 3. Cuando los datos cambian, se emiten al BehaviorSubject
    this._formularioData.next(data);
    console.log('setFormularioData desde el servicio (BehaviorSubject):', data);
  }

  // 4. Método para obtener el valor actual de manera síncrona (si es necesario)
  getFormularioDataValue() {
    return this._formularioData.getValue();
  }
}