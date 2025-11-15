import { Component, Inject, Input, OnInit, VERSION } from '@angular/core';
import {MatDialogModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Planes } from "../../../../../../data/interfaces/planes";








@Component({
    selector: 'app-clinicas-list',
    templateUrl: './clinicas-list.component.html',
    styleUrls: ['./clinicas-list.component.css'],
    standalone: true
})
export class ClinicasListComponent implements OnInit {
    @Input() producto: Planes | null = null;

  product: any;
  public pdfSrc : string;
folleto: string;


// Users: USERS[] = UsersJson;

  constructor(
   
   ) {
}





  ngOnInit(): void {
    if (this.producto){
      console.log(this.producto.item_id),
    console.log(this.producto.name),
    console.log(this.producto.price),
    console.log(this.producto.category),
    console.log(this.producto.rating),
    console.log(this.producto.clinicas),
    console.log(this.producto),
    console.log("pdfSrc");
    this.product= this.producto;
    this.folleto= 'assets/archivos/' + this.product.folleto[2] + '/beneficios/' + this.product.folleto[2]
    this.pdfSrc = this.producto.folletos[0];
    
  }

}

}