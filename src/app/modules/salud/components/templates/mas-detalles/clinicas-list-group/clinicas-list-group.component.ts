import { Component, Inject, Input, OnInit, VERSION } from '@angular/core';
import {MatDialogModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
// import {DialogData2} from './../../../molecules/product-card/product-card.component';
// import { SortPipe } from '../../../../../../../pipes/sort.pipe';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { Planes } from "../../../../../../data/interfaces/planes";



/**
 * @title Basic use of the tab group
 */

@Component({
    selector: 'app-clinicas-list-group',
    templateUrl: './clinicas-list-group.component.html',
    styleUrls: ['./clinicas-list-group.component.css'],
    imports: [MatTabsModule, NgFor, FormsModule, InputTextModule
      // SortPipe
    ]
})
export class ClinicasListGroupComponent implements OnInit {
  @Input() product: any;
  
  selectedClinicas: any;
  matTabLabels: string[] = [];
   SortbyParam = '';
  SortDirection = 'asc';
  displayedColumns: string[] = ['Nombre', 'Barrio/Localidad'];
  searchText: string = '';
  filteredProducts: any[] = [];
 
  constructor(
    
  
  ) {  

}
 showDiv1 = false;
showDiv2 = true;

  ngOnInit() {
   
    console.log('this.product :');

    console.log(this.product);

    if(this.product){
    this.selectedClinicas = this.product.clinicas;
    this.filterProducts();
    console.log(this.product.clinicas)
  this.populateMatTabLabels();
    }
  }
  

  tabChanged(event: any) {
    console.log(event);
    if (event.index != 0) {
      const filterText = event.tab.textLabel;
      if(this.product){
      this.selectedClinicas = this.product.clinicas.filter((clinicas: any) => {
        return clinicas.region === filterText;
      });
      console.log(this.selectedClinicas);
    }}
  }

  populateMatTabLabels(): void {

    let clinicas: any[];
    if (this.product){
      console.log("linea 68",this.product )
      clinicas = this.product.clinicas.map((clinica: any) => clinica.region)
    } 
    const regions: string[] = clinicas;
    const uniqueRegions: string[] = Array.from(new Set(regions));
    this.matTabLabels = ['TODAS', ...uniqueRegions];
  }
  
  filterProducts() {
    this.filteredProducts = this.selectedClinicas.filter((clinica: { nombre: string; }) =>
      clinica.nombre.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}
