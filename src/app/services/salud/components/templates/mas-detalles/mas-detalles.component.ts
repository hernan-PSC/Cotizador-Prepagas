import { Component, Inject, Input, OnChanges, OnInit, SimpleChanges, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import {MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute, Router, RouterLinkActive, Routes } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { ClinicasListGroupComponent } from "./clinicas-list-group/clinicas-list-group.component";
import { MatTabsModule } from '@angular/material/tabs';
import { Planes } from "../../../../../data/interfaces/planes";

import {PdfViewerComponent } from "./pdf-viewer/pdf-viewer.component";




@Component({
    selector: 'app-mas-detalles',
    templateUrl: './mas-detalles.component.html',
    styleUrls: ['./mas-detalles.component.css'],
    imports: [
        MatDialogModule,
        MatTabsModule,
        ClinicasListGroupComponent,
        MatButtonModule
    ]
})
export class MasDetallesComponent implements OnInit, OnDestroy {
  @Input() cobertura: Planes | null = null;

  selectedIndex;
  matTabLabels = ['Clinicas y Sanatorios','Folleto'];
  product: any;

  public pdfSrc : string= '';
folleto: string= '';
  navLinks = [];
  selectedIndexChange(val: number) {
    this.selectedIndex = val;
    console.log('this is selected index: ', val);
  }

  isViewInitialized = false;
    myObject = {
    'key1': 'value1',
    'key2': 'value2'
  };

  title: any;
 
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private changeDetector: ChangeDetectorRef
   ) { 
   }


  mySortingFunction = (a, b) => {
    return a.key > b.key ? -1 : 1;
  }

  map = new Map([['mapKey1', 'mapValue1'], ['mapKey2', 'mapValue2']]);
  
    openTab = 1;
  toggleTabs($tabNumber: number){
    this.openTab = $tabNumber;
  }
  // ************ CLAVE: Usar ngOnChanges para reaccionar al @Input() ************
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cobertura'] && changes['cobertura'].currentValue) {
      this.cobertura = changes['cobertura'].currentValue;
      
      // *** AQUÍ VEA SU CONSOLE.LOG ***
      console.log("✅ MasDetallesComponent: ¡Producto recibido!", this.cobertura);
      // *** Aquí puede poner cualquier lógica de inicialización que antes tenía en ngOnInit ***
    }
  }
  ngOnInit(): void {
  
    
    console.log("this.producto ",this.cobertura)
    

    
    this.navLinks = (
      this.route.routeConfig && this.route.routeConfig.children ?
        this.buildNavItems(this.route.routeConfig.children) :
        []
    );
    console.warn('----nav links founded: ', this.navLinks);
  };

    onNoClick(): void {
    // this.dialogRef.close();
  }


  ngOnDestroy() {
    console.warn('---- Dialog was destroyed ----');
    // this.router.navigate(['']);
  }

  ngAfterViewInit() {
    this.isViewInitialized = true;
    this.changeDetector.detectChanges();
  }

  buildNavItems(routes: Routes) {
    return (routes)
      .filter(route => route.data)
      .map(({ path = '', data }) => ({
        path: path,
        label: data.label,
        icon: data.icon
      }));
  }

  // isLinkActive(rla: RouterLinkActive): boolean {
  //   const routerLink = rla.linksWithHrefs.first;

  //   return this.router.isActive(routerLink.urlTree, false);
  // }
}
