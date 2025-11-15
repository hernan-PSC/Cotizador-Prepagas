import { Component, OnInit, Input } from '@angular/core';
import { ComparaAttributesComponent } from './compara-attributes/compara-attributes.component';
import { ComparaClinicasComponent } from './compara-clinicas/compara-clinicas/compara-clinicas.component';
import { NgIf } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import {MatIconModule,MatIconRegistry} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import { DomSanitizer } from "@angular/platform-browser";
const logoURL = "assets/images/iconos/ubicacione.svg";
@Component({
    selector: 'app-compara-item',
    templateUrl: './compara-item.component.html',
    styleUrls: ['./compara-item.component.css'],
    standalone: true,
    imports: [
      ComparaClinicasComponent,
      ComparaAttributesComponent,
     MatDialogModule,
      MatTabsModule,
      MatIconModule
    ]
})
export class ComparaItemComponent implements OnInit {
  @Input() compareList: any;
  @Input() clinicasVal: any;
  @Input() productos: any;
  @Input() items: any;
 
  constructor(
    private matIconRegistry1: MatIconRegistry,
     private matIconRegistry2: MatIconRegistry,
    private domSanitizer1: DomSanitizer,
    
    private domSanitizer2: DomSanitizer
  ) { 
          this.matIconRegistry1.addSvgIcon(
      "ubicaciones",
      this.domSanitizer1.bypassSecurityTrustResourceUrl('assets/images/iconos/ubicaciones.svg'));
                this.matIconRegistry2.addSvgIcon(
      "corazon_tilde",
      this.domSanitizer2.bypassSecurityTrustResourceUrl('assets/images/iconos/corazon_tilde.svg'));
  }

 

    onPrint() {
      window.print();  
    }
  ngOnInit(): void {
   
  }
 
}
