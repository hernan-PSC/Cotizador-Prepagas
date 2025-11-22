import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
// Importación necesaria para el manejo de Observables y propagación de errores
import { Observable, throwError } from 'rxjs'; 
import { tap, catchError } from 'rxjs/operators';


@Injectable({
  // providedIn: 'root' asegura que el servicio sea un Singleton optimizado.
  providedIn: 'root'
})
export class CotizacionService {
  // Uso de variables de entorno para una gestión de URLs limpia y específica por entorno.
  private url = environment.apiUrl; 
  
  // Propiedades de clase para almacenar las referencias a los Observables.
  // Nota: Estas propiedades contendrán el Observable, no el valor resuelto.
  public planes: any;
  public precios: any;
  public clinicas: any;
  public empresas: any;

  constructor(private http: HttpClient) {
    // Inicialización del Observable de planes en el constructor.
    this.planes = this.getPlanes();
  }

  /**
   * @description
   * Envía una petición POST para cotizar, implementando el manejo de errores con RxJS.
   * @param formCotizar Datos del formulario de cotización.
   * @returns Observable con la respuesta de precios, encadenado con operadores de error.
   */
  getPrecios(formCotizar: any): Observable<any> {
    const api_url = `${this.url}/cotizacion`;
console.log('api_url   :',api_url)
    // Asigna el Observable a la propiedad 'precios'.
    this.precios = this.http.post<any>(api_url, formCotizar).pipe(
      // Utiliza 'tap' para efectos secundarios (ej. logging) sin alterar el flujo de datos.
      tap(response => {
        // ... (lógica interna)
      }),
      // Manejo de errores centralizado y propagado al componente que se suscriba.
      catchError(error => {
        console.error('Error al obtener precios:', error);
        return throwError(() => new Error('Fallo la cotización.')); 
      })
    );
    // Retorna el Observable para permitir la suscripción del componente o servicio.
    console.log('tgis.precios en el servidor de angiula');
    console.log(this.precios)

    return this.precios;
  }
  
  /**
   * @description
   * Método GET para obtener planes. Asigna y retorna el Observable.
   * @returns Observable<any>
   */
  getPlanes(): Observable<any> {
    const api_url = `${this.url}/planes`;
    this.planes = this.http.get(api_url);
    return this.planes;
  }
  
  /**
   * @description
   * Método GET para obtener clínicas.
   * @returns Observable<any>
   */
  getClinicas(): Observable<any> {
    const api_url = `${this.url}/clinicas`;
    this.clinicas = this.http.get(api_url);
    return this.clinicas;
  }

  /**
   * @description
   * Método GET para obtener empresas.
   * @returns Observable<any>
   */
  getEmpresas(): Observable<any> {
    const api_url = `${this.url}/empresas`;
    this.empresas = this.http.get(api_url);
    return this.empresas;
  }
}